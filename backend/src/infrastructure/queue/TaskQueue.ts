import { ExtractProfile } from '@/core'
import { IQueueRepository, ITask } from '../repository'
import { client, profileRepository, repositoryRepository } from '../container'
import log from 'npmlog'

export class TaskQueue {
    private _workerBusy: boolean

    private _retryTimer: NodeJS.Timeout
    private _retryInterval: number
    private stopped = false

    constructor(private readonly queue: IQueueRepository) {
        this._workerBusy = false
        this._retryTimer = null
        this._retryInterval = 10000
    }

    public stop() {
        this._workerBusy = true
        clearTimeout(this._retryTimer)
    }

    public pause() {
        this._workerBusy = true
    }

    public start() {
        this._workerBusy = false
        setImmediate(this._worker.bind(this))
    }

    private async _worker(): Promise<void> {
        if (this._workerBusy || this.stopped) return
        this._workerBusy = true
        const job = await this.queue.getNext()
        try {
            if (job) {
                log.info('TaskQueue:', ` Process Taks: ${job.id}`)
                await this.processTask(job)
            }
            log.info('TaskQueue:', ' not have pending jobs')
        } catch (e) {
            log.error('TaskQueue:', e.message, e)
            await this.queue.onDone({ ...job, done: true, error: { message: e.message, code: 400 } })
            setImmediate(this._worker.bind(this))
            this._retryInterval = this._retryInterval >= 16000 ? 32000 : this._retryInterval * 2
            this._retryTimer = setTimeout(this._worker.bind(this), this._retryInterval)
        }
        this._retryInterval = this._retryInterval >= 16000 ? 32000 : this._retryInterval * 2
        this._retryTimer = setTimeout(this._worker.bind(this), this._retryInterval)
        this._workerBusy = false
    }

    private async processTask(task: ITask) {
        const usecase = new ExtractProfile(client, profileRepository, repositoryRepository)
        await usecase.execute({ requestId: task.id, url: task.url })
        return this.onDone(task)
    }

    private async onDone(task: ITask) {
        await this.queue.onDone({ ...task, done: true })
    }
}

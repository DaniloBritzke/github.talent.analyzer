import { IQueueRepository, ITask, ITaskCreate } from '../interfaces'
import database from '@/db'

export class PrismaQueueRepository implements IQueueRepository {
    async getNext(): Promise<ITask | null> {
        return await database.prismaClient.task.findFirst({
            where: {
                done: false,
                timestamp: {
                    lt: Date.now(),
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        })
    }

    async create(data: ITaskCreate): Promise<ITask> {
        const newTask = await database.prismaClient.task.create({ data })
        return { ...newTask, error: undefined }
    }

    async onDone({ id, done, error }: Partial<ITask>): Promise<void> {
        await database.prismaClient.task.update({
            where: { id },
            data: {
                done: done ?? true,
                error,
            },
        })
    }
}

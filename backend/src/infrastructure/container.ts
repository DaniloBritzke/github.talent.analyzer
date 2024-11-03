import { GithubClient } from './clients'
import { TaskQueue } from './queue'
import { AppConfig } from '../AppConfig'
import {
    IProfileRepository,
    IQueueRepository,
    IRepositoryRepository,
    IRequestRepository,
    PrismaQueueRepository,
    PrismaRequestRepository,
    ProfileRepository,
} from './repository'
import { RepositoryRepository } from './repository/prisma/RepositoryRepository'

export const profileRepository: IProfileRepository = new ProfileRepository()
export const queueRepository: IQueueRepository = new PrismaQueueRepository()
export const repositoryRepository: IRepositoryRepository = new RepositoryRepository()
export const requestRepository: IRequestRepository = new PrismaRequestRepository()

export const client = new GithubClient()

export const taskQueue = new TaskQueue(queueRepository)

export async function onStartup() {
    client.init({ key: AppConfig.getInstance().GITHUB_KEY })
    taskQueue.start()
}

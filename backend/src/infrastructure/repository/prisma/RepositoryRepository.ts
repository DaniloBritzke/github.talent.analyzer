import { IListLanguagesOptions, IRepository, IRepositoryCreate } from '@github.talent.analizer/core'
import { IRepositoryRepository } from '../interfaces'
import database from '@/db'
import { Prisma } from '@/generated/shcemas/mongodb'

export class RepositoryRepository implements IRepositoryRepository {
    async getById(id: string): Promise<IRepository> {
        const found = await database.prismaClient.repository.findUnique({ where: { id }, include: { languages: true } })
        if (!found) {
            return undefined
        }
        const repository: IRepository = {
            id: found.id,
            name: found.name,
            fullName: found.fullName,
            private: found.private,
            url: found.url,
            description: found.description,
            fork: found.fork,
            createdAt: new Date(found.createdAt),
            updatedAt: found.updatedAt ? new Date(found.updatedAt) : undefined,
            pushedAt: found.pushedAt,
            stargazersCount: found.stargazersCount,
            watchersCount: found.watchersCount,
            forksCount: found.forksCount,
            language: found.language || '',
            profileId: found.profileId || '',
            commitActivity: [],
            languages: found.languages?.map(lang => ({
                id: lang.id,
                language: lang.language,
                value: lang.value,
                repositoryId: lang.repositoryId,
            })) || [],
        }

        return repository
    }

    async listLanguages({ language }: IListLanguagesOptions): Promise<string[]> {
        const where: Prisma.LanguageWhereInput = {}
        if (language) {
            where.language = { contains: language, mode: 'insensitive' }
        }
        const found = await database.prismaClient.language.findMany({
            where,
            select: { language: true },
        })

        if (!found.length) {
            return []
        }

        return Array.from(new Set(found.map(item => item.language)))
    }

    async listByProfileId(profileId: string): Promise<IRepository[]> {
        const found = await database.prismaClient.repository.findMany({ where: { profileId }, include: { languages: true } })
        if (!found.length) {
            return []
        }

        const result = found.map(r => ({
            id: r.id,
            name: r.name,
            fullName: r.fullName,
            private: r.private,
            url: r.url,
            description: r.description,
            fork: r.fork,
            createdAt: new Date(r.createdAt),
            updatedAt: r.updatedAt ? new Date(r.updatedAt) : undefined,
            pushedAt: r.pushedAt,
            stargazersCount: r.stargazersCount,
            watchersCount: r.watchersCount,
            forksCount: r.forksCount,
            language: r.language || '',
            profileId: r.profileId || '',
            commitActivity: [],
            languages: r.languages?.map(lang => ({
                id: lang.id,
                language: lang.language,
                value: lang.value,
                repositoryId: lang.repositoryId,
            })) || [],
        }))

        return result
    }

    async create(data: IRepositoryCreate): Promise<void> {
        await database.prismaClient.repository.create({
            data: {
                name: data.name,
                fullName: data.fullName,
                private: data.private,
                url: data.url,
                description: data.description,
                fork: data.fork ?? false,
                createdAt: data.createdAt.toISOString(),
                updatedAt: data.updatedAt?.toISOString(),
                pushedAt: data.pushedAt,
                stargazersCount: data.stargazersCount,
                watchersCount: data.watchersCount,
                forksCount: data.forksCount,
                language: data.language,
                profileId: data.profileId,
                commitActivity: data.commitActivity ? JSON.stringify(data.commitActivity) : null,
                languages: {
                    create: data.languages?.map(lang => ({
                        language: lang.language,
                        value: lang.value,
                    })),
                },
            },
            include: {
                languages: true,
            },
        })
    }
}

import { IProfile, IProfileCreate, IProfileListOptions } from '@github.talent.analizer/core'
import { Prisma } from '../../../generated/shcemas/mongodb'
import { IProfileRepository } from '../interfaces'
import database from '@/db'

export class ProfileRepository implements IProfileRepository {
    async list({ ids, name, requestId, language }: IProfileListOptions): Promise<IProfile[]> {
        const whereLng: { language?: { contains: string; mode: 'insensitive' } } = {}

        if (language) {
            whereLng.language = { contains: language, mode: 'insensitive' }
        }

        const repositories = language
            ? await database.prismaClient.repository.findMany({
                where: {
                    languages: {
                        some: whereLng,
                    },
                },
                select: { id: true },
            })
            : []

        const repositoryIds = repositories.map(repo => repo.id)

        if (repositoryIds.length === 0 && language) {
            return []
        }

        const where: Prisma.ProfileWhereInput = {
            repositories: repositoryIds.length
                ? {
                    some: {
                        id: { in: repositoryIds },
                    },
                }
                : undefined,
        }

        if (ids) {
            where.id = { in: ids }
        }

        if (name) {
            where.name = { contains: name, mode: 'insensitive' }
        }

        if (requestId) {
            where.requestId = requestId
        }

        const list = await database.prismaClient.profile.findMany({ where })

        return list
    }

    async getById(id: string): Promise<IProfile> {
        const found = await database.prismaClient.profile.findUnique({
            where: { id },
        })
        if (!found) {
            return undefined // TODO: create error
        }
        return found
    }

    async create(profile: IProfileCreate): Promise<IProfile> {
        const newProfile = await database.prismaClient.profile.create({ data: { ...profile } })
        return newProfile
    }
}

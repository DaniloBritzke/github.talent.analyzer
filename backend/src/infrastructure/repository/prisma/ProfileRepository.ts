import { IProfile, IProfileCreate, IProfileListOptions } from '@github.talent.analizer/core'
import { Prisma } from '../../../generated/shcemas/mongodb'
import { IProfileRepository } from '../interfaces'
import database from '@/db'

export class ProfileRepository implements IProfileRepository {
    async list({ ids, name, requestId }: IProfileListOptions): Promise<IProfile[]> {
        const where: Prisma.ProfileWhereInput = {}
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
        if (!list.length) {
            return []
        }
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

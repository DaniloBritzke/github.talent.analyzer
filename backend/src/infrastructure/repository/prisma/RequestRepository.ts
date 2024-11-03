import { IRequestCreate, IRequest } from '@github.talent.analizer/core'
import { IRequestRepository } from '../interfaces'
import database from '@/db'

export class PrismaRequestRepository implements IRequestRepository {
    async create(data: IRequestCreate): Promise<IRequest> {
        try {
            const newRequest = await database.prismaClient.request.create({
                data: { ...data },

            })
            return newRequest
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }

    async getById(id: string): Promise<IRequest | null> {
        const request = await database.prismaClient.request.findUnique({
            where: {
                id,
            },
        })

        if (!request) {
            throw new Error(`Request with id ${id} not found`)
        }

        return request
    }
}

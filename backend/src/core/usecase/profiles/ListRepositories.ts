import { IRepositoryRepository } from '@/infrastructure'
import { validate } from '@/utils/validate'
import { IListRepositoriesOptions } from '@github.talent.analizer/core'
import Joi from 'joi'

export class ListRepositories {
    constructor(private readonly repoRepository: IRepositoryRepository) {

    }

    async execute(data: IListRepositoriesOptions) {
        const { profileId } = validate(ListRepositories.Schema, data)
        return await this.repoRepository.listByProfileId(profileId)
    }

    static Schema = Joi.object<IListRepositoriesOptions>({
        profileId: Joi.string().required(),
    })
}

import { IProfileRepository } from '@/infrastructure'
import { validate } from '@/utils/validate'
import { IProfileListOptions } from '@github.talent.analizer/core'
import Joi from 'joi'

export class ListProfiles {
    constructor(
      private readonly profileRepository: IProfileRepository,
    ) { }

    async execute(data: IProfileListOptions) {
        const { ids, requestId, name, language } = validate(ListProfiles.Schema, data)
        return await this.profileRepository.list({ ids, requestId, name, language })
    }

    static Schema = Joi.object<IProfileListOptions>({
        name: Joi.string().empty(Joi.valid('', null)),
        requestId: Joi.string().empty(Joi.valid('', null)),
        language: Joi.string().empty(Joi.valid('', null)),
        ids: Joi.array().items(Joi.string().empty(Joi.valid('', null))).empty(Joi.valid('', null)),
    })
}

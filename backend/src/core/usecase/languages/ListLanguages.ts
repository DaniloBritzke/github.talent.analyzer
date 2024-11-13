import { IRepositoryRepository } from '@/infrastructure'
import { validate } from '@/utils/validate'
import { IListLanguagesOptions } from '@github.talent.analizer/core'
import Joi from 'joi'

export class ListLanguages {
    constructor(private readonly repoRepository: IRepositoryRepository) {

    }

    async execute(data: IListLanguagesOptions) {
        const valid = validate(ListLanguages.Schema, data)
        return await this.repoRepository.listLanguages(valid)
    }

    static Schema = Joi.object<IListLanguagesOptions>({
        language: Joi.string().empty(Joi.valid('', null)),
    })
}

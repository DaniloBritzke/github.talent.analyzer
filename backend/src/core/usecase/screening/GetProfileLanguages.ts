import { validate } from '@/utils/validate'
import { IRepositoryLanguagesResponse } from '@github.talent.analizer/core'
import Joi from 'joi'
import { IClientGitHub } from '../../client/IGitHubClient'
import log from 'npmlog'

export interface IGetProfileLanguagesData {
  userName: string;
  repositoryName: string
}

export class GetProfileLanguages {
    constructor(private readonly client: IClientGitHub) { }

    async execute(data: IGetProfileLanguagesData): Promise<IRepositoryLanguagesResponse> {
        const { userName, repositoryName } = validate(GetProfileLanguages.Schema, data)
        try {
            const languages = await this.client.getRepositoryLanguages(userName, repositoryName)
            return languages
        } catch (error) {
            log.error(GetProfileLanguages.constructor.name, error.message)
            return undefined
        }
    }

    static Schema = Joi.object<IGetProfileLanguagesData>({
        userName: Joi.string().required(),
        repositoryName: Joi.string().required(),
    })
}

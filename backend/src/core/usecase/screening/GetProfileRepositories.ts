import { validate } from '@/utils/validate'
import { IUserRepository } from '@github.talent.analizer/core'
import Joi from 'joi'
import { IClientGitHub } from '../../client/IGitHubClient'

export interface IGetProfileRepositoriesData {
  userName: string
}

export class GetProfileRepositories {
    constructor(private readonly client: IClientGitHub) { }

    async execute(data: IGetProfileRepositoriesData): Promise<IUserRepository[]> {
        const { userName } = validate(GetProfileRepositories.Schema, data)
        return await this.client.getUserRepositories(userName)
    }

    static Schema = Joi.object<IGetProfileRepositoriesData>({
        userName: Joi.string().required(),
    })
}

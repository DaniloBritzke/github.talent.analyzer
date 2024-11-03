import { validate } from '@/utils/validate'
import { IRepositoryContributor } from '@github.talent.analizer/core'
import Joi from 'joi'
import { IClientGitHub } from '../../client/IGitHubClient'

export interface IGetContributorsData {
  userName: string;
  repositoryName: string
}

export class GetContributors {
    constructor(private readonly client: IClientGitHub) { }

    async execute(data: IGetContributorsData): Promise<IRepositoryContributor[]> {
        const { userName, repositoryName } = validate(GetContributors.Schema, data)
        return await this.client.getRepositoryContributors(userName, repositoryName)
    }

    static Schema = Joi.object<IGetContributorsData>({
        userName: Joi.string().required(),
        repositoryName: Joi.string().required(),
    })
}

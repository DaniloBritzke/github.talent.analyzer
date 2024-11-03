import { validate } from '@/utils/validate'
import { IGetProfileDetailsResponse } from '@github.talent.analizer/core'
import Joi from 'joi'
import { IClientGitHub } from '../../client/IGitHubClient'

export interface IGetProfileDetailsData {
  userName: string
}

export class GetProfileDetails {
    constructor(private readonly client: IClientGitHub) { }

    async execute(data: IGetProfileDetailsData): Promise<IGetProfileDetailsResponse> {
        const { userName } = validate(GetProfileDetails.Schema, data)
        return await this.client.getProfileDetails({ userName })
    }

    static Schema = Joi.object<IGetProfileDetailsData>({
        userName: Joi.string().required(),
    })
}

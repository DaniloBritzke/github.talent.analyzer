import { IQueueRepository, IRequestRepository } from '@/infrastructure'
import { validate } from '@/utils/validate'
import Joi from 'joi'

export interface IScheduleProfilesData {
  profileUrl: string[],
  name: string;
  description: string
}

export class ScheduleProfiles {
    constructor(
      private readonly requestRepository: IRequestRepository,
      private readonly queueRepository: IQueueRepository,
    ) { }

    async execute(data: IScheduleProfilesData) {
        const { profileUrl, description, name } = validate(ScheduleProfiles.Schema, data)
        const result = await this.requestRepository.create({ profileUrl, description, name })
        await Promise.all(profileUrl.map(p => this.pushToqueue(p)))
        return result
    }

    private async pushToqueue(url: string) {
        const now = Date.now()
        await this.queueRepository.create({ url, timestamp: now })
    }

    static Schema = Joi.object<IScheduleProfilesData>({
        name: Joi.string().optional().default(''),
        description: Joi.string().optional().default(''),
        profileUrl: Joi.array()
            .items(
                Joi.string()
                    .uri({ scheme: ['http', 'https'] })
                    .custom((value, helpers) => {
                        if (!value.includes('github.com/')) {
                            return helpers.error('string.uri', { value })
                        }
                        return value
                    }),
            )
            .required(),
    })
}

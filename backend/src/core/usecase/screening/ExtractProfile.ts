import { validate } from '@/utils/validate'
import Joi from 'joi'
import { GetProfileDetails } from './GetProfileDetails'
import { GetProfileRepositories } from './GetProfileRepositories'
import { GetProfileLanguages } from './GetProfileLanguages'
import { GetContributors } from './GetContributors'
import { IProfileRepository, IRepositoryRepository } from '@/infrastructure'
import { IClientGitHub } from '../../client/IGitHubClient'
import { StoreProfile } from './StoreProfile'

export interface IExtractProfileData {
  url: string
  requestId: string
}

export class ExtractProfile {
    constructor(
    private readonly client: IClientGitHub,
    private readonly profileRepository: IProfileRepository,
    private readonly repositoriesRepository: IRepositoryRepository,

    ) { }

    async execute(data: IExtractProfileData): Promise<void> {
        const valid = validate(ExtractProfile.Schema, data)
        const userName = this.extractUsernameFromUrl(valid.url)

        const profileDetails = await new GetProfileDetails(this.client).execute({ userName })
        const profileRepositories = await new GetProfileRepositories(this.client).execute({ userName })

        const getLanguagesUseCase = new GetProfileLanguages(this.client)
        const getContributorsUseCase = new GetContributors(this.client)

        const repositoriesWithDetails = await Promise.all(
            profileRepositories.map(async (repository) => {
                const repositoryName = repository.name
                const languages = await getLanguagesUseCase.execute({ userName, repositoryName })
                const contributors = await getContributorsUseCase.execute({ userName, repositoryName })

                return {
                    ...repository,
                    languages,
                }
            }),
        )

        await new StoreProfile(this.profileRepository, this.repositoriesRepository).execute({
            requestId: valid.requestId,
            profile: profileDetails,
            repositories: repositoriesWithDetails,
        })
    }

    private extractUsernameFromUrl(githubUrl: string): string {
        const regex = /github\.com\/([a-zA-Z0-9-]+)/
        const match = githubUrl.match(regex)
        if (!match || !match[1]) {
            throw new Error('Invalid GitHub URL')
        }
        return match[1]
    }

    static Schema = Joi.object<IExtractProfileData>({
        url: Joi.string().pattern(/github\.com\/([a-zA-Z0-9-]+)/).required(),
        requestId: Joi.string().required(),
    })
}

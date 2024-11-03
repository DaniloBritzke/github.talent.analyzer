import { validate } from '@/utils/validate'
import Joi, { ObjectSchema } from 'joi'
import { IProfileRepository, IRepositoryRepository } from '@/infrastructure'
import { IGetProfileDetailsResponse, ILanguageCreate, IProfileCreate, IRepositoryCreate, IRepositoryLanguagesResponse, IUserRepository } from '@github.talent.analizer/core'

export interface IUserRepositoryWithLanguages extends IUserRepository {
  languages?: IRepositoryLanguagesResponse;
  // contributors?: IRepositoryContributor[];
}

export interface IExtractProfileData {
  requestId: string;
  profile: IGetProfileDetailsResponse;
  repositories: IUserRepositoryWithLanguages[];
}

export class StoreProfile {
    constructor(
    private readonly profileRepository: IProfileRepository,
    private readonly repositoriesRepository: IRepositoryRepository,

    ) { }

    async execute(data: IExtractProfileData): Promise<void> {
        const { requestId, profile, repositories } = validate(StoreProfile.Schema, data)

        const profileData = await this.profileRepository.create({
            ...this.mapProfileData(profile),
            requestId: requestId.toString(),
        })
        Promise.all(
            repositories.map(r => this.repositoriesRepository.create(this.mapRepositoryData(r, profileData.id))),
        )
    }

    private mapProfileData(profile: IGetProfileDetailsResponse): IProfileCreate {
        return {
            name: profile?.name || profile.login,
            bio: profile.bio,
            company: profile.company,
            blog: profile.blog,
            location: profile.location,
            email: profile.email,
            followers: profile.followers,
            following: profile.following,
        }
    }

    private mapRepositoryData(repo: IUserRepositoryWithLanguages, profileId: string): IRepositoryCreate {
        const languages = this.mapLanguages(repo.languages)
        return {
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private,
            url: repo.html_url,
            description: repo.description || undefined,
            fork: repo.fork || undefined,
            createdAt: new Date(repo.created_at),
            updatedAt: repo.updated_at ? new Date(repo.updated_at) : undefined,
            pushedAt: repo.pushed_at || undefined,
            stargazersCount: repo.stargazers_count,
            watchersCount: repo.watchers_count,
            forksCount: repo.forks_count,
            language: repo.language || 'Unknown',
            profileId,
            commitActivity: [],
            languages,
        }
    }

    private mapLanguages(languages: IRepositoryLanguagesResponse): ILanguageCreate[] {
        if (!languages) {
            return []
        }
        return Object.entries(languages).map(([language, value]) => ({
            language,
            value,
        }))
    }

    static Schema: ObjectSchema<IExtractProfileData> = Joi.object<IExtractProfileData>({
        requestId: Joi.string().required(),
        profile: Joi.object<IGetProfileDetailsResponse>({
            id: Joi.number().required(),
            login: Joi.string().empty(Joi.valid('', null)),
            name: Joi.string().empty(Joi.valid('', null)),
            company: Joi.string().empty(Joi.valid('', null)),
            blog: Joi.string().empty(Joi.valid('', null)),
            location: Joi.string().empty(Joi.valid('', null)),
            email: Joi.string().empty(Joi.valid('', null)),
            bio: Joi.string().empty(Joi.valid('', null)),
            followers: Joi.number().empty(Joi.valid('', null)),
            following: Joi.number().empty(Joi.valid('', null)),
        }).required(),

        repositories: Joi.array().items(
            Joi.object({
                id: Joi.number().required(),
                name: Joi.string().empty(Joi.valid('', null)),
                full_name: Joi.string().empty(Joi.valid('', null)),
                private: Joi.boolean().empty(Joi.valid('', null)),
                html_url: Joi.string(),
                description: Joi.string().empty(Joi.valid('', null)),
                fork: Joi.boolean().required(),
                created_at: Joi.string().isoDate().required(),
                updated_at: Joi.string().isoDate().required(),
                pushed_at: Joi.string().isoDate().required(),
                stargazers_count: Joi.number().empty(Joi.valid('', null)),
                watchers_count: Joi.number().empty(Joi.valid('', null)),
                forks_count: Joi.number().empty(Joi.valid('', null)),
                language: Joi.string().empty(Joi.valid('', null)),
                languages: Joi.any(),
            }),
        ).required(),
    })
}

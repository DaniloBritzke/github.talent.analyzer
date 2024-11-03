import {
    IClientGitHubOptions,
    IGetProfileDetailsParams,
    IGetProfileDetailsResponse,
    IRepositoryContributor,
    IRepositoryLanguagesResponse,
    IUserRepository,
} from '@github.talent.analizer/core'

export abstract class IClientGitHub {
  abstract init(options: IClientGitHubOptions): Promise<void>;
  abstract getProfileDetails(params: IGetProfileDetailsParams): Promise<IGetProfileDetailsResponse>;
  abstract getUserRepositories(userName: string): Promise<IUserRepository[]>;
  abstract getRepositoryLanguages(owner: string, repo: string): Promise<IRepositoryLanguagesResponse>;
  abstract getRepositoryContributors(owner: string, repo: string): Promise<IRepositoryContributor[]>;
}

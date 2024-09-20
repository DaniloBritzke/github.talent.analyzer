export interface IClientGitHubOptions {
  key: string;
}

export interface IGetProfileDetailsParams {
  userName: string;
}


export interface IGetProfileDetailsResponse {
  id: number;
  name: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

export interface IUserRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
}

export interface IRepositoryContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface ICommitActivity {
  total: number; 
  week: number;
  days: number[];
}

export interface IRepositoryLanguagesResponse {
  [language: string]: number; 
}

export abstract class IClientGitHub {
  abstract init(): Promise<void>;
  abstract getProfileDetails(params: IGetProfileDetailsParams): Promise<IGetProfileDetailsResponse>;
  abstract getUserRepositories(userName: string): Promise<IUserRepository[]>;
  abstract getRepositoryLanguages(owner: string, repo: string): Promise<IRepositoryLanguagesResponse>;
  abstract getRepositoryContributors(owner: string, repo: string): Promise<IRepositoryContributor[]>;
}
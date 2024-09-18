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

export abstract class IClientGitHub {
  abstract init(): Promise<void>
  abstract getProfileDetails(params: IGetProfileDetailsParams): Promise<IGetProfileDetailsResponse>
}
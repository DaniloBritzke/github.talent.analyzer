import { ICommitActivity } from './IGithubClient'
import { IProfile } from './IProfile'

export interface ILanguageCreate {
  language: string
  value: number
  repositoryId?: string
}

export interface ILanguage extends ILanguageCreate {
  id: string
}

export interface IRepositoryCreate {
  name: string
  fullName: string
  private: boolean
  url: string
  description?: string
  fork?: boolean
  createdAt: Date
  updatedAt?: Date
  pushedAt?: string
  stargazersCount: number
  watchersCount: number
  forksCount: number
  language: string
  profileId: string
  commitActivity?: ICommitActivity[]
  languages?: ILanguageCreate[]
}

export interface IRepository extends IRepositoryCreate {
  id: string
  profile?: IProfile
  languages?: ILanguage[]
}

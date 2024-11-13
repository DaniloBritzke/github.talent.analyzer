import { IRepository, IRepositoryCreate, IListLanguagesOptions, IListLanguagesResult } from '@github.talent.analizer/core'

export interface IRepositoryRepository {
  create(data: IRepositoryCreate):Promise<void>
  getById(id: string): Promise<IRepository>
  listLanguages(options: IListLanguagesOptions): Promise<IListLanguagesResult>
  listByProfileId(profileId: string): Promise<IRepository[]>
}

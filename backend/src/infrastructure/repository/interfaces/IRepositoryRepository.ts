import { IRepository, IRepositoryCreate } from '@github.talent.analizer/core'

export interface IRepositoryRepository {
  create(data: IRepositoryCreate):Promise<void>
  getById(id: string):Promise<IRepository>
}

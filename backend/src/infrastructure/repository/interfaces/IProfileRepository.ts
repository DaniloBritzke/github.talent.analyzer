import { IProfile, IProfileCreate, IProfileListOptions } from '@github.talent.analizer/core'

export interface IProfileRepository {
  create(profile: IProfileCreate):Promise<IProfile>
  list(options: IProfileListOptions):Promise<IProfile[]>
  getById(id: string):Promise<IProfile>
}

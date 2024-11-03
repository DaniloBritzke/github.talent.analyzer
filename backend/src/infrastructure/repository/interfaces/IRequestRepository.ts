import { IRequest, IRequestCreate } from '@github.talent.analizer/core'

export interface IRequestRepository {
  create(data: IRequestCreate):Promise<IRequest>
  getById(id: string):Promise<IRequest>
}

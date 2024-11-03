export interface IRequestCreate {
  name: string
  description: string
  profileUrl: string[]
}

export interface IRequest extends IRequestCreate {
  id: string;
}

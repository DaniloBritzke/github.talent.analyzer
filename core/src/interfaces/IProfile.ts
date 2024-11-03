export interface IProfileCreate {
  requestId?: string
  name: string
  company?: string
  blog?: string
  location?: string
  email?: string
  bio?: string
  followers?: number
  following?: number
}

export interface IProfile extends IProfileCreate {
  id: string
}

export interface IProfileListOptions {
  ids: string[];
  name: string;
  requestId: string;

}

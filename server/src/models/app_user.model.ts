import { BaseModel } from './base.model'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const roles = <const> ['admin', 'attendee', 'speaker']
export type Roles = typeof roles[number]

export interface IAppUser {
  roles: Roles[]
  firebase_uid: string
}

export class AppUser extends BaseModel implements IAppUser {
  roles: Roles[]
  firebase_uid: string
  static tableName = 'app_user'

  static companyId = 1
}

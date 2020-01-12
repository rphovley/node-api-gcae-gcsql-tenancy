import { BaseModel } from './base.model'

const roles = <const> ['admin', 'rider'];
type Roles = typeof roles[number];

export interface iAppUser {
  firebase_id: string
  first_name: string
  last_name: string
  roles: Roles[]
  current_license_img: string
  current_license_exp: string
  current_insurance_img: string
  current_insurance_exp: string
}

export class AppUser extends BaseModel implements iAppUser {
  firebase_id: string
  first_name: string
  last_name: string
  roles: Roles[]
  current_license_img: string
  current_license_exp: string
  current_insurance_img: string
  current_insurance_exp: string
  static tableName = 'app_user'
}
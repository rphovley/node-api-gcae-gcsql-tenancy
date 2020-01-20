import { BaseModel } from './base.model'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const roles = <const> ['admin']
export type Roles = typeof roles[number]

export enum DriverStatus {
  pending = 'pending',
  expired = 'expired',
  approved = 'approved',
  rejected = 'rejected'
}

export interface IAppUser {
  firebase_id: string
  first_name: string
  last_name: string
  roles: Roles[]
  email: string
  phone_number: string
  driver_status: DriverStatus
  current_license_img: string
  current_license_exp: string
  current_insurance_img: string
  current_insurance_exp: string
}

export class AppUser extends BaseModel implements IAppUser {
  firebase_id: string
  first_name: string
  last_name: string
  roles: Roles[]
  email: string
  phone_number: string
  driver_status: DriverStatus
  current_license_img: string
  current_license_exp: string
  current_insurance_img: string
  current_insurance_exp: string
  static tableName = 'app_user'

  $beforeInsert(): void {
    super.$beforeInsert()
    this.driver_status = DriverStatus.pending
  }
}

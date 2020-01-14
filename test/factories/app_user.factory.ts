/* eslint-disable dot-notation */
import * as Knex from 'knex'
import { IAppUser, AppUser as AppUserModel, DriverStatus } from '../../server/src/models/app_user.model'

import faker = require('faker')

export const appUser = (user?: IAppUser): IAppUser => {
  return {
    firebase_id: faker.random.uuid(),
    first_name: faker['name'].firstName(),
    last_name: faker['name'].lastName(),
    roles: ['rider'],
    email: faker['internet'].email(),
    phone_number: faker['phone'].phoneNumber(),
    driver_status: DriverStatus.pending,
    current_license_img: '',
    current_license_exp: '',
    current_insurance_img: '',
    current_insurance_exp: '',
    ...user,
  }
}

export const AppUser = async (knex: Knex, appUserData?: IAppUser): Promise<AppUserModel> => {
  return AppUserModel.query(knex).insert(appUser(appUserData))
}

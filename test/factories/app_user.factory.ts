/* eslint-disable dot-notation */
import * as Knex from 'knex'
import { IAppUser, AppUser as AppUserModel, Roles } from '../../server/src/models/app_user.model'

import faker = require('faker')

export const appUser = (user?: IAppUser): IAppUser => {
  return {
    firebase_uid: faker.random.uuid(),
    roles: ['attendee'] as Roles[],
    ...user,
  }
}

export const AppUser = async (knex: Knex, appUserData?: IAppUser): Promise<AppUserModel> => {
  return AppUserModel.query(knex).insert(appUser(appUserData))
}

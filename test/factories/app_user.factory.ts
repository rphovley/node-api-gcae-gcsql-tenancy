/* eslint-disable dot-notation */
import * as Knex from 'knex'
import { IAppUser, AppUser as AppUserModel, Roles } from '../../server/src/models/app_user.model'

import faker = require('faker')

export const appUser = (user?): IAppUser => {
  return {
    firebase_uid: faker.random.uuid(),
    roles: ['attendee'] as Roles[],
    created_at: (new Date()).toISOString(),
    updated_at: (new Date()).toISOString(),
    ...user,
  }
}

export const AppUser = async (knex: Knex, appUserData?): Promise<AppUserModel> => {
  return AppUserModel.query(knex).insert(appUser(appUserData))
}

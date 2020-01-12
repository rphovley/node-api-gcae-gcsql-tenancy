import * as Knex from "knex"
import { iAppUser, AppUser as AppUserModel } from '../../server/src/models/app_user.model'
const faker = require('faker')

export const appUser = (user?: iAppUser): iAppUser =>{

  return { 
    firebase_id: faker.random.uuid(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    roles: ["rider"],
    current_license_img: "",
    current_license_exp: "",
    current_insurance_img: "",
    current_insurance_exp: "",
    ...user,  
  }
}

export const AppUser = async (knex: Knex, appUserData?: iAppUser): Promise<AppUserModel> => {
  return await AppUserModel.query(knex).insert(appUser(appUserData))
}

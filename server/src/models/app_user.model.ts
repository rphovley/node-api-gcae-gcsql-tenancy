import { BaseModel, IBaseModel } from './base.model'
import { ILead, Lead } from './lead.model'

import Knex = require('knex')

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const roles = <const> ['admin', 'attendee', 'speaker']
export type Roles = typeof roles[number]

export interface IAppUser extends IBaseModel {
  roles: Roles[]
  firebase_uid: string
  email: string
}

export interface ISignupUser extends IAppUser{
  lead: ILead
  firebase_token: string
}

export class AppUser extends BaseModel implements IAppUser {
  roles: Roles[]
  firebase_uid: string
  email: string
  static tableName = 'app_user'

  // TODO: Current Step, need to clean off unnecessary fields from insert data
  static async signupEngageUser(knex: Knex, signupUser: ISignupUser): Promise<Lead> {
    let [lead] = await knex.select({ app_user_id: 'app_user.id', lead_id: 'lead.id' }).from('lead').leftJoin('app_user', 'lead.login_id', 'app_user.id').where('app_user.firebase_uid', signupUser.firebase_uid)
    let appUserId = lead ? lead.app_user_id : null
    if (!lead) {
      // create app user
      const appUser = await AppUser.query(knex).insert(signupUser)
      appUserId = appUser.id
    }
    signupUser.lead.login_id = appUserId
    if (!lead.lead_id) {
      // create lead
      lead = await AppUser.query(knex).insert(signupUser.lead)
    } else {
      // update lead
      lead = await AppUser.query(knex).patch(signupUser.lead)
    }
    return lead
  }
  // static async createEngageUser(knex: Knex, signupUser: ISignupUser): Promise<Lead> {
  //   // if AppUser exists, move on
  //   let lead
  //   try {
  //     await knex.transaction(async (tx) => {
  //       let appUser = await AppUser.query(knex).findOne({ firebase_uid: signupUser.firebase_uid })
  //       if (!appUser) appUser = await AppUser.query(tx).insert(signupUser) // if AppUser does not exist, create

  //       lead = await Lead.query(knex).findOne({ login_id: appUser.id })
  //       signupUser.lead.email = appUser.email
  //       if (lead) await Lead.query(tx).patch(signupUser.lead) // if lead exists, patch
  //       else await Lead.query(tx).insert(signupUser.lead) // if lead does not exist, create
  //     })
  //   } catch (err) {
  //     console.error(err)
  //   }
  //   return lead
  // }
}

import { Request, Response, NextFunction } from '../../middleware/express'
import { Roles, AppUser, ISignupUser } from '../../models/app_user.model'
import { AuthErrors } from '../../utils/customErrors'
import { Lead } from '../../models/lead.model'
import { AuthValidation } from '../../models/validations/auth.validation'
import { getConfigForTenant } from '../../utils/tenant_db_config'

import admin = require('firebase-admin')
import Knex = require('knex')

export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  // receive google data and the related attendee information
  const { body } = req as { body: ISignupUser }
  try {
    AuthValidation.validateSignup(req)
    const knex = Knex(await getConfigForTenant(req.headers.tenantid))
    body.roles = ['attendee'] as Roles[] // ensure a attendee can't set their role
    const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate firebase token
    delete body.firebase_token // remove token, don't want to insert it. Only need the firebase uid.
    body.firebase_uid = fUser.uid

    await AppUser.signupEngageUser(knex, req.body)
    // let loggedInUser = await Lead.query(knex).findOne({ login_id: appUser.id })
    // if (!loggedInUser) loggedInUser = await AppUser.createEngageUser(req.knex, body) // if user doesn't exist, create them
    res.send({ message: 'success', data: {} })
  } catch (err) {
    if (err.code) next(new AuthErrors.FirebaseError())
    return next(err)
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  // receive google data and the related attendee information
  const { body } = req
  if (!body) return next({ status: 422, message: 'Body required to update attendee profile' })
  body.roles = ['attendee'] as Roles[] // ensure an attendee can't set their role
  try {
    const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate firebase token
    delete body.firebase_token // remove token, don't want to insert it. Only need the firebase uid.
    body.firebase_id = fUser.uid
    const loggedInUser = await AppUser.query(req.knex).findOne({ firebase_id: body.firebase_id })
    if (!loggedInUser) throw new AuthErrors.UserDoesNotExistError('A user with that firebase_token does not exist. Send user to signup.')
    const appUser = await AppUser.query(req.knex).patchAndFetchById(loggedInUser.id, body)
    res.send({ message: 'success', data: appUser })
  } catch (err) {
    return next(err)
  }
}

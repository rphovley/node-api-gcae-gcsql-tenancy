import { Request, Response, NextFunction } from 'express'
import { Roles, AppUser } from '../models/app_user.model'
import { CustomErrors } from '../utils/customErrors'

import admin = require('firebase-admin')

export class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    if (!body || !body.firebase_token) return next({ status: 422, message: 'firebase_token on body required to login' })
    try {
      const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate firebase token
      const loggedInUser = await AppUser.query().findOne({ firebase_id: fUser.uid })
      if (!loggedInUser) throw new CustomErrors.UserDoesNotExistError('A user with that firebase_token does not exist. Send user to signup.')
      res.send({ message: 'success', data: loggedInUser })
    } catch (err) {
      return next(err)
    }
  }

  public static async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    // receive google data and the related attendee information
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to signup attendee' })
    body.roles = ['attendee'] as Roles[] // ensure a attendee can't set their role
    try {
      const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate firebase token
      delete body.firebase_token // remove token, don't want to insert it. Only need the firebase uid.
      body.firebase_id = fUser.uid
      let loggedInUser = await AppUser.query().findOne({ firebase_id: body.firebase_id })
      if (!loggedInUser) loggedInUser = await AppUser.query().insert(body)[0]
      res.send({ message: 'success', data: loggedInUser })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    // receive google data and the related attendee information
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to update attendee profile' })
    body.roles = ['attendee'] as Roles[] // ensure an attendee can't set their role
    try {
      const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate firebase token
      delete body.firebase_token // remove token, don't want to insert it. Only need the firebase uid.
      body.firebase_id = fUser.uid
      const loggedInUser = await AppUser.query().findOne({ firebase_id: body.firebase_id })
      if (!loggedInUser) throw new CustomErrors.UserDoesNotExistError('A user with that firebase_token does not exist. Send user to signup.')
      const appUser = await AppUser.query().patchAndFetchById(loggedInUser.id, body)
      res.send({ message: 'success', data: appUser })
    } catch (err) {
      return next(err)
    }
  }
}

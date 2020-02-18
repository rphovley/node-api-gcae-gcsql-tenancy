import { Request, Response, NextFunction } from './express'
import { CustomErrors, BaseError } from '../utils/customErrors'
import { initializeFirebase, admin } from '../utils/firebase_config'
import { getLogger } from '../utils/logger'
import { AppUser } from '../models/app_user.model'

class Authentication {
  constructor() {
    initializeFirebase()
  }
  public whiteList: string[] = [
    // Add unprotected endpoints here
    '/api/auth/login',
    '/api/auth/signup',
    '/api/tenant',
  ]

  public async firebaseAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (this.whiteList.find(x => x === req.url)) {
      return next()
    }
    try {
      if (!req.headers.authorization) throw new CustomErrors.UnauthorizedError('No Authorization token sent.')
      if (!req.headers.clientid) throw new CustomErrors.UnauthorizedError('No Client id sent.')
      req.appUser = await Authentication.getUser(req)
    } catch (err) {
      if (err instanceof BaseError) next(err)
      else next(new CustomErrors.UnauthorizedError())
    }
    return next()
  }

  private static async getUser(req: Request): Promise<AppUser> {
    const token = req.headers.authorization
    const { knex } = req
    let appUser
    try {
      const fUser = await admin.auth().verifyIdToken(token)
      appUser = await AppUser.query(knex).findOne({ firebase_uid: fUser.uid })
      if (!appUser) throw new CustomErrors.UserNotFoundUnauthorizedError('No User found for that firebase_id. Send user to registration')
    } catch (err) {
      if (err instanceof CustomErrors.UserNotFoundUnauthorizedError) { // user with that id not found
        throw err
      } else if (err.code.indexOf('id-token-expired') > -1) { // if from firebase about the token expiring
        throw new CustomErrors.TokenExpiredError()
      } else if (!err.code) {
        getLogger().error(err) // report error to error service if from firebase
      }
      throw new CustomErrors.UnauthorizedError()
    }
    return appUser
  }
}

export default new Authentication()

import { Request, Response, NextFunction } from './express'
import { AuthErrors, BaseError } from '../utils/customErrors'
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

  public firebaseAuth(): (Request, Response, NextFunction) => void {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (this.whiteList.find(x => x === req.url)) {
        return next()
      }
      try {
        if (!req.headers.authorization) throw new AuthErrors.UnauthorizedError('No Authorization token sent.')
        if (!req.headers.clientid) throw new AuthErrors.UnauthorizedError('No Client id sent.')
        req.appUser = await Authentication.getUser(req)
      } catch (err) {
        if (err instanceof BaseError) next(err)
        else next(new AuthErrors.UnauthorizedError())
      }
      return next()
    }
  }

  private static async getUser(req: Request): Promise<AppUser> {
    const token = req.headers.authorization
    const { knex } = req
    let appUser
    try {
      const fUser = await admin.auth().verifyIdToken(token)
      appUser = await AppUser.query(knex).findOne({ firebase_uid: fUser.uid })
      if (!appUser) throw new AuthErrors.UserNotFoundUnauthorizedError('No User found for that firebase_id. Send user to registration')
    } catch (err) {
      if (err instanceof AuthErrors.UserNotFoundUnauthorizedError) { // user with that id not found
        throw err
      } else if (err.code.indexOf('id-token-expired') > -1) { // if from firebase about the token expiring
        throw new AuthErrors.TokenExpiredError()
      } else if (!err.code) {
        getLogger().error(err) // report error to error service if from firebase
      }
      throw new AuthErrors.UnauthorizedError()
    }
    return appUser
  }
}

export default new Authentication()

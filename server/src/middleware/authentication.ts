import { Request, Response, NextFunction } from 'express'
import { CustomErrors } from '../utils/customErrors'
import { initializeFirebase, admin } from '../utils/firebase_config'
import { AppUser } from '../models/app_user.model'
import { getLogger } from '../utils/logger'

class Authentication {
  constructor() {
    initializeFirebase()
  }
  public whiteList: string[] = [
    // Add unprotected endpoints here
    // '/api/test',
  ]

  public firebaseAuth() {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      if (this.whiteList.find(x => x === req.url)) {
        return next()
      }
      try {
        // eslint-disable-next-line dot-notation
        req['appUser'] = await Authentication.getUser(req.headers.authorization)
      } catch (err) {
        return next(new CustomErrors.UnauthorizedError())
      }
      return next()
    }
  }

  private static async getUser(token): Promise<AppUser> {
    let appUser
    try {
      const fUser = await admin.auth().verifyIdToken(token)
      appUser = await AppUser.query().findOne({ firebase_id: fUser.uid })
    } catch (err) {
      if (!(err.code.indexOf('id-token-expired') > -1)) {
        getLogger().error(err) // report error to error service if from firebase
      }
      throw new CustomErrors.UnauthorizedError()
    }
    return appUser
  }
}

export default new Authentication()

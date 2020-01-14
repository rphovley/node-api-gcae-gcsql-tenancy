import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { AuthController } from '../controllers/auth.controller'
import { AppUser, IAppUser } from '../models/app_user.model'

export class AuthRoute extends BaseRoute {
  public static create(router: Router): void {
    router.post('/api/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
      const { body }: {body: IAppUser} = req
      if (!body) return next({ status: 422, message: 'Body required to signup rider' })
      body.roles = ['rider']
      try {
        const appUsers = await AppUser.query().insert(body)
        res.send({ message: 'success', data: appUsers })
      } catch (err) {
        return next(err)
      }
      AuthController.signup(req, res, next)
    })
  }
}

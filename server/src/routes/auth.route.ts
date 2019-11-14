import { BaseRoute } from './base.route'
import { Router, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/auth.controller'
// import { guard } from '../middleware/guard'

export class AuthRoute extends BaseRoute {
  public static create(router: Router): void {

    router.post('/api/auth/login', (req: Request, res: Response, next: NextFunction) => {
      new AuthController().login(req, res, next)
    })
  }
}

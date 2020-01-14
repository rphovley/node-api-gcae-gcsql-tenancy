import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { AuthController } from '../controllers/auth.controller'

export class AuthRoute extends BaseRoute {
  public static create(router: Router): void {
    router.post('/api/auth/login', async (req: Request, res: Response, next: NextFunction) => {
      AuthController.login(req, res, next)
    })
    router.post('/api/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
      AuthController.signup(req, res, next)
    })
  }
}

import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { AppUserController } from '../controllers/app_user.controller'

export class AppUserRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/app_users', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.index(req, res, next)
    })
    router.get('/api/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.show(req, res, next)
    })
    router.post('/api/app_users', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.create(req, res, next)
    })
    router.put('/api/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.update(req, res, next)
    })
    router.delete('/api/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.delete(req, res, next)
    })
  }
}

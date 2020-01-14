import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from '../base.route'
import { AppUserController } from '../../controllers/admin/app_user.controller'

export class AppUserRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/admin/app_users', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.index(req, res, next)
    })
    router.get('/api/admin/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.show(req, res, next)
    })
    router.post('/api/admin/app_users', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.create(req, res, next)
    })
    router.put('/api/admin/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.update(req, res, next)
    })
    router.delete('/api/admin/app_users/:id', (req: Request, res: Response, next: NextFunction) => {
      AppUserController.delete(req, res, next)
    })
  }
}

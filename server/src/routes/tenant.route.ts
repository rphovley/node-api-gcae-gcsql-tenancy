import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { TenantController } from '../controllers/tenant.controller'

export class TenantRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/tenant', async (req: Request, res: Response, next: NextFunction) => {
      TenantController.index(req, res, next)
    })
  }
}

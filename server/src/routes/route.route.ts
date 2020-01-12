import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { RouteController } from '../controllers/route.controller'

export class RouteRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/routes', (req: Request, res: Response, next: NextFunction) => {
      RouteController.index(req, res, next)
    })
    router.get('/api/routes/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteController.show(req, res, next)
    })
    router.post('/api/routes', (req: Request, res: Response, next: NextFunction) => {
      RouteController.create(req, res, next)
    })
    router.put('/api/routes/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteController.update(req, res, next)
    })
    router.delete('/api/routes/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteController.delete(req, res, next)
    })
  }
}

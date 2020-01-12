import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { RouteTimeBlockController } from '../controllers/route_time_block.controller'

export class RouteTimeBlockRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/route_time_blocks', (req: Request, res: Response, next: NextFunction) => {
      RouteTimeBlockController.index(req, res, next)
    })
    router.get('/api/route_time_blocks/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteTimeBlockController.show(req, res, next)
    })
    router.post('/api/route_time_blocks', (req: Request, res: Response, next: NextFunction) => {
      RouteTimeBlockController.create(req, res, next)
    })
    router.put('/api/route_time_blocks/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteTimeBlockController.update(req, res, next)
    })
    router.delete('/api/route_time_blocks/:id', (req: Request, res: Response, next: NextFunction) => {
      RouteTimeBlockController.delete(req, res, next)
    })
  }
}

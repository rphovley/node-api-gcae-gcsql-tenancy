import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { EndpointController } from '../controllers/endpoint.controller'

export class EndpointRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/endpoint', (req: Request, res: Response, next: NextFunction) => {
      EndpointController.index(req, res, next)
    })
    router.get('/api/endpoint/:id', (req: Request, res: Response, next: NextFunction) => {
      EndpointController.show(req, res, next)
    })
    router.post('/api/endpoint', (req: Request, res: Response, next: NextFunction) => {
      EndpointController.create(req, res, next)
    })
    router.put('/api/endpoint/:id', (req: Request, res: Response, next: NextFunction) => {
      EndpointController.update(req, res, next)
    })
    router.delete('/api/endpoint/:id', (req: Request, res: Response, next: NextFunction) => {
      EndpointController.delete(req, res, next)
    })
  }
}

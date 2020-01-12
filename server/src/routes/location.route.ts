import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { LocationController } from '../controllers/location.controller'

export class LocationRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/locations', (req: Request, res: Response, next: NextFunction) => {
      LocationController.index(req, res, next)
    })
    router.get('/api/locations/:id', (req: Request, res: Response, next: NextFunction) => {
      LocationController.show(req, res, next)
    })
    router.post('/api/locations', (req: Request, res: Response, next: NextFunction) => {
      LocationController.create(req, res, next)
    })
    router.put('/api/locations/:id', (req: Request, res: Response, next: NextFunction) => {
      LocationController.update(req, res, next)
    })
    router.delete('/api/locations/:id', (req: Request, res: Response, next: NextFunction) => {
      LocationController.delete(req, res, next)
    })
  }
}

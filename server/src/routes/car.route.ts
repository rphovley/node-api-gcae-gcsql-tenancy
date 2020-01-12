import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { CarController } from '../controllers/car.controller'

export class CarRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/cars', (req: Request, res: Response, next: NextFunction) => {
      CarController.index(req, res, next)
    })
    router.get('/api/cars/:id', (req: Request, res: Response, next: NextFunction) => {
      CarController.show(req, res, next)
    })
    router.post('/api/cars', (req: Request, res: Response, next: NextFunction) => {
      CarController.create(req, res, next)
    })
    router.put('/api/cars/:id', (req: Request, res: Response, next: NextFunction) => {
      CarController.update(req, res, next)
    })
    router.delete('/api/cars/:id', (req: Request, res: Response, next: NextFunction) => {
      CarController.delete(req, res, next)
    })
  }
}

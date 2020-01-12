import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { PriceController } from '../controllers/price.controller'

export class PriceRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/prices', (req: Request, res: Response, next: NextFunction) => {
      PriceController.index(req, res, next)
    })
    router.get('/api/prices/:id', (req: Request, res: Response, next: NextFunction) => {
      PriceController.show(req, res, next)
    })
    router.post('/api/prices', (req: Request, res: Response, next: NextFunction) => {
      PriceController.create(req, res, next)
    })
    router.put('/api/prices/:id', (req: Request, res: Response, next: NextFunction) => {
      PriceController.update(req, res, next)
    })
    router.delete('/api/prices/:id', (req: Request, res: Response, next: NextFunction) => {
      PriceController.delete(req, res, next)
    })
  }
}

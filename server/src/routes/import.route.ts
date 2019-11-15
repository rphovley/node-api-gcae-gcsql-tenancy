import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { ImportController } from '../controllers/import.controller'

export class ImportRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/import', (req: Request, res: Response, next: NextFunction) => {
      ImportController.index(req, res, next)
    })
    router.get('/api/import/:id', (req: Request, res: Response, next: NextFunction) => {
      ImportController.show(req, res, next)
    })
    router.post('/api/import', (req: Request, res: Response, next: NextFunction) => {
      ImportController.create(req, res, next)
    })
    router.put('/api/import/:id', (req: Request, res: Response, next: NextFunction) => {
      ImportController.update(req, res, next)
    })
    router.delete('/api/import/:id', (req: Request, res: Response, next: NextFunction) => {
      ImportController.delete(req, res, next)
    })
  }
}

import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from '../base.route'
import { EventController } from '../../controllers/admin/event.controller'

export class EventRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/admin/events', (req: Request, res: Response, next: NextFunction) => {
      EventController.index(req, res, next)
    })
    router.get('/api/admin/events/:id', (req: Request, res: Response, next: NextFunction) => {
      EventController.show(req, res, next)
    })
    router.post('/api/admin/events', (req: Request, res: Response, next: NextFunction) => {
      EventController.create(req, res, next)
    })
    router.put('/api/admin/events/:id', (req: Request, res: Response, next: NextFunction) => {
      EventController.update(req, res, next)
    })
    router.delete('/api/admin/events/:id', (req: Request, res: Response, next: NextFunction) => {
      EventController.delete(req, res, next)
    })
  }
}

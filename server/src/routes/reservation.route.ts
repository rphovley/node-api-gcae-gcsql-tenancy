import { Router, Request, Response, NextFunction } from 'express'
import { BaseRoute } from './base.route'
import { ReservationController } from '../controllers/reservation.controller'

export class ReservationRoute extends BaseRoute {
  public static create(router: Router): void {
    router.get('/api/reservations', (req: Request, res: Response, next: NextFunction) => {
      ReservationController.index(req, res, next)
    })
    router.get('/api/reservations/:id', (req: Request, res: Response, next: NextFunction) => {
      ReservationController.show(req, res, next)
    })
    router.post('/api/reservations', (req: Request, res: Response, next: NextFunction) => {
      ReservationController.create(req, res, next)
    })
    router.put('/api/reservations/:id', (req: Request, res: Response, next: NextFunction) => {
      ReservationController.update(req, res, next)
    })
    router.delete('/api/reservations/:id', (req: Request, res: Response, next: NextFunction) => {
      ReservationController.delete(req, res, next)
    })
  }
}

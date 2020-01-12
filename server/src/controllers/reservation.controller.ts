import { Request, Response, NextFunction } from 'express'
import { Reservation } from '../models/reservation.model'

export class ReservationController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const reservations = await Reservation.query().eager('[car, route_time_block, app_user]')
      res.json({ message: 'success', data: reservations })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const reservationId = req.params.id
    if (!reservationId) return next({ status: 422, message: 'id required to update Reservation' })
    try {
      const reservations = await Reservation.query().findById(reservationId).eager('[car, route_time_block, app_user]')
      res.json({ message: 'success', data: reservations })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create Reservation' })
    try {
      const reservations = await Reservation.query().insert(body)
      res.send({ message: 'success', data: reservations })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const reservationId = req.params.id
    if (!reservationId) return next({ status: 422, message: 'id required to update Reservation' })
    try {
      const reservations = await Reservation.query().patchAndFetchById(reservationId, body)
      if (!reservations) return next({ status: 404, message: `Could not find Reservation with id: ${reservationId}` })
      res.send({ message: 'success', data: reservations })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const reservationId = req.params.id
    if (!reservationId) return next({ status: 422, message: 'id required to update Reservation' })
    try {
      const reservations = await Reservation.query().deleteById(reservationId)
      if (!reservations) return next({ status: 404, message: `Could not find Reservation with id: ${reservationId}. May be already deleted.` })
      res.send({ message: 'success', data: reservations })
    } catch (err) {
      return next(err)
    }
  }
}

import { Request, Response, NextFunction } from 'express'
import { Car } from '../models/car.model'

export class CarController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const cars = await Car.query()
      res.json({ message: 'success', data: cars })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const carId = req.params.id
    if (!carId) return next({ status: 422, message: 'id required to update Car' })
    try {
      const cars = await Car.query().findById(carId).eager('endpoints')
      res.json({ message: 'success', data: cars })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create Car' })
    try {
      const cars = await Car.query().insert(body)
      res.send({ message: 'success', data: cars })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const carId = req.params.id
    if (!carId) return next({ status: 422, message: 'id required to update Car' })
    try {
      const cars = await Car.query().patchAndFetchById(carId, body)
      if (!cars) return next({ status: 404, message: `Could not find Car with id: ${carId}` })
      res.send({ message: 'success', data: cars })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const carId = req.params.id
    if (!carId) return next({ status: 422, message: 'id required to update Car' })
    try {
      const cars = await Car.query().deleteById(carId)
      if (!cars) return next({ status: 404, message: `Could not find Car with id: ${carId}. May be already deleted.` })
      res.send({ message: 'success', data: cars })
    } catch (err) {
      return next(err)
    }
  }
}

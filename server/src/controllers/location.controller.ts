import { Request, Response, NextFunction } from 'express'
import { Location } from '../models/location.model'

export class LocationController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const locations = await Location.query()
      res.json({ message: 'success', data: locations })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const locationId = req.params.id
    if (!locationId) return next({ status: 422, message: 'id required to update Location' })
    try {
      const locations = await Location.query().findById(locationId)
      res.json({ message: 'success', data: locations })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create Location' })
    try {
      const locations = await Location.query().insert(body)
      res.send({ message: 'success', data: locations })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const locationId = req.params.id
    if (!locationId) return next({ status: 422, message: 'id required to update Location' })
    try {
      const locations = await Location.query().patchAndFetchById(locationId, body)
      if (!locations) return next({ status: 404, message: `Could not find Location with id: ${locationId}` })
      res.send({ message: 'success', data: locations })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const locationId = req.params.id
    if (!locationId) return next({ status: 422, message: 'id required to update Location' })
    try {
      const locations = await Location.query().deleteById(locationId)
      if (!locations) return next({ status: 404, message: `Could not find Location with id: ${locationId}. May be already deleted.` })
      res.send({ message: 'success', data: locations })
    } catch (err) {
      return next(err)
    }
  }
}

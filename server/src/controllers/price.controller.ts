import { Request, Response, NextFunction } from 'express'
import { Price } from '../models/price.model'

export class PriceController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const prices = await Price.query().eager('[route]')
      res.json({ message: 'success', data: prices })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const priceId = req.params.id
    if (!priceId) return next({ status: 422, message: 'id required to update Price' })
    try {
      const prices = await Price.query().findById(priceId).eager('[route]')
      res.json({ message: 'success', data: prices })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create Price' })
    try {
      const prices = await Price.query().insert(body)
      res.send({ message: 'success', data: prices })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const priceId = req.params.id
    if (!priceId) return next({ status: 422, message: 'id required to update Price' })
    try {
      const prices = await Price.query().patchAndFetchById(priceId, body)
      if (!prices) return next({ status: 404, message: `Could not find Price with id: ${priceId}` })
      res.send({ message: 'success', data: prices })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const priceId = req.params.id
    if (!priceId) return next({ status: 422, message: 'id required to update Price' })
    try {
      const prices = await Price.query().deleteById(priceId)
      if (!prices) return next({ status: 404, message: `Could not find Price with id: ${priceId}. May be already deleted.` })
      res.send({ message: 'success', data: prices })
    } catch (err) {
      return next(err)
    }
  }
}

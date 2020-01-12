import { Request, Response, NextFunction } from 'express'
import { Route } from '../models/route.model'

export class RouteController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const routes = await Route.query().eager('[starts_at, ends_at]')
      res.json({ message: 'success', data: routes })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const routeId = req.params.id
    if (!routeId) return next({ status: 422, message: 'id required to update Route' })
    try {
      const routes = await Route.query().findById(routeId).eager('[starts_at, ends_at]')
      res.json({ message: 'success', data: routes })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create Route' })
    try {
      const routes = await Route.query().insert(body)
      res.send({ message: 'success', data: routes })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const routeId = req.params.id
    if (!routeId) return next({ status: 422, message: 'id required to update Route' })
    try {
      const routes = await Route.query().patchAndFetchById(routeId, body)
      if (!routes) return next({ status: 404, message: `Could not find Route with id: ${routeId}` })
      res.send({ message: 'success', data: routes })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const routeId = req.params.id
    if (!routeId) return next({ status: 422, message: 'id required to update Route' })
    try {
      const routes = await Route.query().deleteById(routeId)
      if (!routes) return next({ status: 404, message: `Could not find Route with id: ${routeId}. May be already deleted.` })
      res.send({ message: 'success', data: routes })
    } catch (err) {
      return next(err)
    }
  }
}

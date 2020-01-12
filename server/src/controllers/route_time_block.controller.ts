import { Request, Response, NextFunction } from 'express'
import { RouteTimeBlock } from '../models/route_time_block.model'

export class RouteTimeBlockController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const routeTimeBlocks = await RouteTimeBlock.query().eager('[route]')
      res.json({ message: 'success', data: routeTimeBlocks })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const routeTimeBlockId = req.params.id
    if (!routeTimeBlockId) return next({ status: 422, message: 'id required to update RouteTimeBlock' })
    try {
      const routeTimeBlocks = await RouteTimeBlock.query().findById(routeTimeBlockId).eager('[route]')
      res.json({ message: 'success', data: routeTimeBlocks })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create RouteTimeBlock' })
    try {
      const routeTimeBlocks = await RouteTimeBlock.query().insert(body)
      res.send({ message: 'success', data: routeTimeBlocks })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const routeTimeBlockId = req.params.id
    if (!routeTimeBlockId) return next({ status: 422, message: 'id required to update RouteTimeBlock' })
    try {
      const routeTimeBlocks = await RouteTimeBlock.query().patchAndFetchById(routeTimeBlockId, body)
      if (!routeTimeBlocks) return next({ status: 404, message: `Could not find RouteTimeBlock with id: ${routeTimeBlockId}` })
      res.send({ message: 'success', data: routeTimeBlocks })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const routeTimeBlockId = req.params.id
    if (!routeTimeBlockId) return next({ status: 422, message: 'id required to update RouteTimeBlock' })
    try {
      const routeTimeBlocks = await RouteTimeBlock.query().deleteById(routeTimeBlockId)
      if (!routeTimeBlocks) return next({ status: 404, message: `Could not find RouteTimeBlock with id: ${routeTimeBlockId}. May be already deleted.` })
      res.send({ message: 'success', data: routeTimeBlocks })
    } catch (err) {
      return next(err)
    }
  }
}

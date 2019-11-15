import { Request, Response, NextFunction } from 'express'
import { Import } from '../models/import.model'

export class ImportController {
  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try {
      const imports = await Import.query()
      res.json({ message: 'success', data: imports })
    } catch (err) {
      return next(err)
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const importId = req.params.id
    if (!importId) return next({ status: 422, message: 'id required to update import'})
    try {
      const imports = await Import.query().findById(importId).eager('endpoints')
      res.json({ message: 'success', data: imports })
    } catch (err) {
      return next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const { body } = req
    if (!body) return next({ status: 422, message: 'Body required to create import'})
    try {
      const imports = await Import.query().insert(body)
      res.send({ message: 'success', data: imports })
    } catch (err) {
      return next(err)
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { body } = req
    const importId = req.params.id
    if (!importId) return next({ status: 422, message: 'id required to update import'})
    try {
      const imports = await Import.query().patchAndFetchById(importId, body)
      if (!imports) return next({ status: 404, message: `Could not find import with id: ${importId}`})
      res.send({ message: 'success', data: imports })
    } catch (err) {
      return next(err)
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const importId = req.params.id
    if (!importId) return next({ status: 422, message: 'id required to update import'})
    try {
      const imports = await Import.query().deleteById(importId)
      if (!imports) return next({ status: 404, message: `Could not find import with id: ${importId}. May be already deleted.`})
      res.send({ message: 'success', data: imports })
    } catch (err) {
      return next(err)
    }
  }
}

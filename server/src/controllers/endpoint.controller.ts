import { Request, Response, NextFunction } from 'express'
import { Endpoint } from '../models/endpoint.model'

export class EndpointController {

  public static async index(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    try{
      const endpoints = await Endpoint.query()
      res.json({message: 'success', data: endpoints})
    }catch(err){
      return next({status:500, message: 'error', err})
    }
  }

  public static async show(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const endpointId = req.params.id
    if (!endpointId) return next({ status: 422, message: 'id required to update endpoint'})
    try{
      const endpoint = await Endpoint.query().findById(endpointId)
      res.json({message: 'success', data: endpoint})
    }catch(err){
      return next({status:500, message: 'error', err})
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction): Promise<void | NextFunction> {
    const body = req.body
    if (!body) return next({ status: 422, message: 'Body required to create endpoint'})
    try{
      const endpoint = await Endpoint.query().insert(body)
      res.send({message: 'success', data: endpoint})
    }catch(err){
      return next({status:500, message: 'error', err})
    }
  }

  public static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = req.body
    const endpointId = req.params.id
    if (!endpointId) return next({ status: 422, message: 'id required to update endpoint'})
    try{
      let endpoint = await Endpoint.query().patchAndFetchById(endpointId, body)
      if(!endpoint) return next({ status: 404, message: `Could not find endpoint with id: ${endpointId}`})
      res.send({message: 'success', data: endpoint})
    }catch(err){
      return next({status:500, message: 'error', err})
    }
  }

  public static async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const endpointId = req.params.id
    if (!endpointId) return next({ status: 422, message: 'id required to update endpoint'})
    try{
      let endpoint = await Endpoint.query().deleteById(endpointId)
      if(!endpoint) return next({ status: 404, message: `Could not find endpoint with id: ${endpointId}. May be already deleted.`})
      res.send({message: 'success', data: endpoint})
    }catch(err){
      return next({status:500, message: 'error', err})
    }
  }
}

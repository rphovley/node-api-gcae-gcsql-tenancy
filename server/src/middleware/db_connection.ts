import { Request, Response, NextFunction } from './express'
import * as models from '../models'
import { knexConfigForTenant } from '../utils/tenant_db_config'
import { CustomErrors } from '../utils/customErrors'

import Knex = require('knex')

const knexCache = new Map()

export const dbConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Function that parses the tenant id from path, header, query parameter etc.
  // and returns an instance of knex. You should cache the knex instances and
  // not create a new one for each query. Knex takes care of connection pooling.
  if (req.headers.clientid) {
    try {
      const knex = await getKnexForRequest(req.headers.clientid)
      Object.keys(models).forEach((key) => {
        models[key] = models[key].bindKnex(knex)
      })
      // eslint-disable-next-line dot-notation
      req.models = models
    } catch (err) {
      next(err)
    }
  }
  next()
}

const getKnexForRequest = async (clientId): Promise<Knex> => {
  clientId = Number(clientId)
  let knex = knexCache.get(clientId)
  if (!knex) {
    const knexConfig = await knexConfigForTenant(clientId)
    if (!knexConfig) throw new CustomErrors.ClientIdMissing()
    knex = Knex(knexConfig)
    knexCache.set(clientId, knex)
  }

  return knex
}

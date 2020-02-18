import { Request, Response, NextFunction } from './express'
import { knexConfigForTenant } from '../utils/tenant_db_config'
import { CustomErrors } from '../utils/customErrors'

import Knex = require('knex')

const knexCache = new Map()

export const dbConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.clientid) {
    try {
      // gets the correct knex instance for the clientId passed
      const knex = await getKnexForRequest(req.headers.clientid)
      req.knex = knex
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

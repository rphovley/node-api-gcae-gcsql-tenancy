import { Request, Response, NextFunction } from './express'
import { getConfigForTenant } from '../utils/tenant_db_config'
import { AuthErrors } from '../utils/customErrors'

import Knex = require('knex')

const knexCache = new Map()

export const dbConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.headers.tenantid) {
    try {
      // gets the correct knex instance for the tenantId passed
      const knex = await getKnexForRequest(req.headers.tenantid)
      req.knex = knex
    } catch (err) {
      next(err)
    }
  }
  next()
}

const getKnexForRequest = async (tenantId): Promise<Knex> => {
  let knex = knexCache.get(tenantId)
  if (!knex) {
    const knexConfig = await getConfigForTenant(tenantId)
    if (!knexConfig) throw new AuthErrors.TenantIdMissing()
    knex = Knex(knexConfig)
    knexCache.set(tenantId, knex)
  }

  return knex
}

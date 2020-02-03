import { Request, Response, NextFunction } from 'express'
import * as models from '../models'
import { knexConfigForTenant } from '../utils/tenant_db_config'

import Knex = require('knex')

const knexCache = new Map()

export const dbConnection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  // Function that parses the tenant id from path, header, query parameter etc.
  // and returns an instance of knex. You should cache the knex instances and
  // not create a new one for each query. Knex takes care of connection pooling.
  if (req.query.tenantId) {
    const knex = await getKnexForRequest(req)
    Object.values(models).forEach(model => {
      model.bindKnex(knex)
    })
    // eslint-disable-next-line dot-notation
    req['models'] = models
  }
  next()
}

const getKnexForRequest = async (req): Promise<Knex> => {
  const { tenantId } = req.query
  let knex = knexCache.get(tenantId)

  if (!knex) {
    knex = Knex(await knexConfigForTenant(tenantId))
    knexCache.set(tenantId, knex)
  }

  return knex
}

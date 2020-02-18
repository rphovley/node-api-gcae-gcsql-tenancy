import { Request, Response, NextFunction } from 'express'
import { initConnection } from '../utils/global_db_config'

import Knex = require('knex')

let globalKnexDB

function getGlobalKnex(): Knex {
  if (!globalKnexDB) globalKnexDB = initConnection()
  return globalKnexDB
}

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // const fUser = await admin.auth().verifyIdToken(body.firebase_token) // validate fir
    const data = await getGlobalKnex().select('id', 'name').from('tenant')
    // const loggedInUser = await AppUser.query().findOne({ firebase_id: fUser.uid })
    // if (!loggedInUser) throw new CustomErrors.UserDoesNotExistError('A user with that firebase_token does not exist. Send user to signup.')
    res.send({ message: 'success', data })
  } catch (err) {
    return next(err)
  }
}

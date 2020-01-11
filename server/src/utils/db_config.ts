
// // Setting up the database connection
import { Model } from 'objection'

import Knex = require('knex')

export const initConnection = (): void => {
  const config: Knex.Config = {
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      charset: 'utf8',
    },
  }
  const knex: Knex = Knex(config)
  Model.knex(knex)
}

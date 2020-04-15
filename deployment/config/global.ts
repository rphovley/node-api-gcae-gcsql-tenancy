
// // Setting up the database connection
import './env'

import Knex = require('knex')


export const config: Knex.Config = {
  client: 'postgres',
  connection: {
    host: process.env.MIGRATION_DB_HOST,
    user: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_NAME,
    port: process.env.APP_DB_PORT ? parseInt(process.env.APP_DB_PORT, 10) : 5432,
    instanceName: 'global-db',
    charset: 'utf8',
  },
}

export const initConnection = (): Knex => {
  const knex: Knex = Knex(config)
  return knex
}

// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node/register')

// eslint-disable-next-line import/first
import { config } from '../server/src/utils/db_config'

module.exports = {

  development:
  {
    ...config,
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
      stub: 'migration.stub.ts',
    },
  },
  staging: {
    ...config,
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    ...config,
    pool: {
      min: 2,
      max: 10,
    },
  },

}

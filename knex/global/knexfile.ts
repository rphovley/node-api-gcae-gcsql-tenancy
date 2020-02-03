require('ts-node/register')

// This file is not used when running migrations or running seeds. It is only used when creating a migration.
// eslint-disable-next-line import/first
import { config } from '../../server/src/utils/global_db_config'

module.exports = {

  development:
  {
    ...config,
    migrations: {
      stub: '../migration.stub.ts',
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

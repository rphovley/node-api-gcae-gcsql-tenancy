/* eslint-disable no-console */
import { initConnection, config } from '../../server/src/utils/global_db_config'

import Knex = require('knex')

const globalMigrationConfig: Knex.MigratorConfig = {
  extension: 'ts',
  stub: 'migration.stub.ts',
  directory: 'migrations',
}

const runGlobalMigrations = async (): Promise<void> => {
  await runMigration(globalMigrationConfig)
}

const runMigration = async (migrationConfig): Promise<void> => {
  const knexInstance = initConnection()
  try {
    await knexInstance.migrate.latest(migrationConfig)
  } catch (err) {
    console.log(err)
    console.log('Migration Failed')
  }
  // eslint-disable-next-line dot-notation
  console.log(`Migrations complete for ${config.connection['instanceName']}`)
  await knexInstance.destroy()
}

runGlobalMigrations()

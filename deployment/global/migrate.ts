/* eslint-disable no-console */
import { initConnection, config } from '../config/global'

import Knex = require('knex')

const globalMigrationConfig: Knex.MigratorConfig = {
  extension: 'ts',
  stub: 'migration.stub.ts',
  directory: 'global/migrations', // relative to migrate.sh script
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
    process.exit(1)
  }
  // eslint-disable-next-line dot-notation
  console.log(`Migrations complete for ${config.connection['instanceName']}`)
  await knexInstance.destroy()
}

runGlobalMigrations()

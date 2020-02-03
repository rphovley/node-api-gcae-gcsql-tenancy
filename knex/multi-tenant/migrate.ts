/* eslint-disable no-console */
import { getConfigs } from '../../server/src/utils/tenant_db_config'

import Knex = require('knex')

const tenantMigrationConfig: Knex.MigratorConfig = {
  extension: 'ts',
  stub: 'migration.stub.ts',
  directory: 'migrations',
}

const runTenantMigrations = async (): Promise<void> => {
  const configs = await getConfigs()
  await configs.forEach(async (config) => {
    await runMigration(config, tenantMigrationConfig)
  })
}

const runMigration = async (config, migrationConfig): Promise<void> => {
  const knexInstance = Knex(config)
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

runTenantMigrations()

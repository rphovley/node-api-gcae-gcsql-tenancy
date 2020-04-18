/* eslint-disable no-console */
import { getConfigs } from '../config/multi-tenant'

import Knex = require('knex')

const tenantMigrationConfig: Knex.MigratorConfig = {
  extension: 'ts',
  stub: 'migration.stub.ts',
  directory: 'deployment/multi-tenant/migrations', // relative to project root
}

const runTenantMigrations = async (): Promise<void> => {
  try {
    const configs = await getConfigs()
    await configs.forEach(async (config) => {
      await runMigration(config, tenantMigrationConfig)
    })
  } catch (err) {
    console.log(err)
    console.log('Retrieving Configs failed. May not have any.')
    process.exit(1)
  }
}

const runMigration = async (config, migrationConfig): Promise<void> => {
  const knexInstance = Knex(config)
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

runTenantMigrations()

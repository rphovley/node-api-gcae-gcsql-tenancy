import { AppUser } from '../../test/factories/app_user.factory'
import { getConfigs, tenantConfig } from '../../server/src/utils/tenant_db_config'

import Knex = require('knex')

export async function seed(knex: Knex): Promise<void> {
  // Clean db
  await deleteRecords(knex)
}

const deleteRecords = async (knex: Knex): Promise<void> => {
  await knex('app_user').del()
}

const runTenantSeeds = async () => {
  console.log('Tenant seeds starting')
  const tenantConfigs = await getConfigs()
  tenantConfigs.forEach(async (config) => {
    const tenantKnex = Knex(config)
    await seed(tenantKnex)
    await tenantKnex.destroy()
  })
  console.log('Tenant seeds completed')
}

runTenantSeeds()

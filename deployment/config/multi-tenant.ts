import { initConnection } from './global'

import Knex = require('knex')

const tenantConnConfigs = new Map()

export const setConnConfigs = async (): Promise<void> => {
  try {
    const globalKnexDB = initConnection()
    const rawConnections = await globalKnexDB.select('*').from('tenant')
    // eslint-disable-next-line no-console
    console.log(rawConnections)
    rawConnections.forEach((conn) => {
      const config = tenantConfig(conn.db_public_host, conn.db_user, conn.db_pass, conn.db_name, conn.db_port, conn.name)
      tenantConnConfigs.set(conn.id, config)
    })
    globalKnexDB.destroy()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    throw new Error('Server Error')
  }
}

export const getConfigs = async (): Promise<Map<string, Knex.Config>> => {
  if (tenantConnConfigs.size <= 0) await setConnConfigs()
  return tenantConnConfigs
}

export const tenantConfig = (host, user, password, database, port, instanceName): Knex.Config => {
  return {
    client: 'postgres',
    connection: {
      host,
      user,
      password,
      database,
      port,
      instanceName,
      charset: 'utf8',
    },
  }
}

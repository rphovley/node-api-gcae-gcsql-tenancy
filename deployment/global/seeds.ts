/* eslint-disable no-console */
/* eslint-disable dot-notation */
import { initConnection } from '../config/global'


import Knex = require('knex')

export async function seed(knex: Knex): Promise<void> {
  // Clean db

  await deleteRecords(knex)
  const now = (new Date()).toISOString()
  console.log('inserting global records')
  await knex('tenant').insert({
    created_at: now,
    updated_at: now,
    name: 'Success Resources',
    db_name: 'replace-me',
    db_user: 'replace-me',
    db_port: '5432',
    db_host: '127.0.0.1',
    db_pass: '',
  })
  await knex('tenant').insert({
    created_at: now,
    updated_at: now,
    name: 'Tony Robbins',
    db_name: 'replace-me',
    db_user: 'replace-me',
    db_port: '5433',
    db_host: '127.0.0.1',
    db_pass: '',
  })
  await knex('tenant').insert({
    created_at: now,
    updated_at: now,
    name: 'Silicon Slopes',
    db_name: 'replace-me',
    db_user: 'replace-me',
    db_port: '5434',
    db_host: '127.0.0.1',
    db_pass: '',
  })
}

const deleteRecords = async (knex: Knex): Promise<void> => {
  console.log('removing global records')
  await knex('tenant').del()
}

const globalKnex = initConnection()

const runSeeds = async (): Promise<void> => {
  console.log('Global seeds starting')
  await seed(globalKnex)
  console.log('Seeds completed')
  await globalKnex.destroy()
}

runSeeds()

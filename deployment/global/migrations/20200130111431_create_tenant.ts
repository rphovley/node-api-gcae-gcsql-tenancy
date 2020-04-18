import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tenant', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('name').notNullable()
      table.string('db_name').notNullable()
      table.string('db_user').notNullable()
      table.string('db_port').notNullable()
      table.string('db_host').notNullable()
      table.string('db_pass').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('tenant')
}

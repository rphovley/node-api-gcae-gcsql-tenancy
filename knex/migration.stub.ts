import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('REPLACE_ME', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('REPLACE_ME')
}

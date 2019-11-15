import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('car', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('name', 255).notNullable()
      table.string('plate', 255).notNullable()
      table.string('year', 255).notNullable()
      table.string('type', 255).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('car')
}

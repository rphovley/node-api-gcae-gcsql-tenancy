import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('route_time_block', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('start_time', { useTz: true }).notNullable()
      table.timestamp('end_time', { useTz: true }).notNullable()
      table.integer('route_id').unsigned().notNullable().references('id')
        .inTable('route')
        .index()
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('route_time_block')
}

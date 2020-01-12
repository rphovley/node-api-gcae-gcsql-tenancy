import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('reservation', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('date', { useTz: true }).notNullable()
      table.string('status').notNullable()
      table.integer('route_time_block_id').unsigned().notNullable().references('id')
        .inTable('route_time_block')
        .index()
      table.integer('car_id').unsigned().notNullable().references('id')
        .inTable('car')
        .index()
      table.integer('app_user_id').unsigned().notNullable().references('id')
        .inTable('app_user')
        .index()
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('reservation')
}

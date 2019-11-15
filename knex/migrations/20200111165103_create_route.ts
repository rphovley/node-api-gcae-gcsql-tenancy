import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('route', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('name').notNullable()
      table.integer('starts_at_id').unsigned().notNullable().references('id')
        .inTable('location')
        .index()
      table.integer('ends_at_id').unsigned().notNullable().references('id')
        .inTable('location')
        .index()
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('route')
}

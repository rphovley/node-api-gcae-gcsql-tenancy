import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('lead', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').unique().notNullable()
      table.string('phone_number').unique().notNullable()
      table.boolean('opt_out').notNullable()
      //       +first_name: string
      // +last_name: string
      // +email: string
      // +number: string
      // +opt_out: boolean
      table.integer('login_id').unsigned().notNullable().references('id')
        .inTable('app_user')
        .index()
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('lead')
}

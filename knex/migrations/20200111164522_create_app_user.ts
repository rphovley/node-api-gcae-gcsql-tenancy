import * as Knex from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('app_user', (table) => {
      table.increments('id')
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.string('firebase_id').notNullable().index('app_user_firebase_id_index')
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.specificType('roles', 'character varying[]').notNullable()
      table.string('current_license_img')
      table.string('current_license_exp')
      table.string('current_insurance_img')
      table.string('current_insurance_exp')
    })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('app_user')
}

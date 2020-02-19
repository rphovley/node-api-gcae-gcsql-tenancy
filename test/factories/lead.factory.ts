/* eslint-disable dot-notation */
import * as Knex from 'knex'
import { ILead, Lead as LeadModel } from '../../server/src/models/lead.model'

import faker = require('faker')

export const lead = (leadData?: Partial<ILead>): Partial<ILead> => {
  return {
    created_at: (new Date()).toISOString(),
    updated_at: (new Date()).toISOString(),
    first_name: faker.random.boolean() ? faker.name.firstName() : null,
    last_name: faker.random.boolean() ? faker.name.lastName() : null,
    email: faker.random.boolean() ? faker.internet.email() : null,
    phone_number: faker.random.boolean() ? faker.phone.phoneNumber() : null,
    ...leadData,
  }
}

// not using the LeadModel here so that it doesn't use model validations on our data
// the database will likely not be clean since we are importing the data
// We still want the model to validate incoming records though
export const Lead = async (knex: Knex, leadData?: Partial<ILead>): Promise<LeadModel> => {
  return knex.insert(lead(leadData)).into('lead')
}

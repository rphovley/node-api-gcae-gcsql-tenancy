/* eslint-disable dot-notation */
import * as Knex from 'knex'
import { IEvent, Event as EventModel } from '../../server/src/models/event.model'

import faker = require('faker')

export const event = (eventData?: IEvent): IEvent => {
  return {
    name: faker.company.companyName(),
    event_type: 'other',
    content_type: 'lecture',
    industry: 'technology',
    location_name: faker.company.companyName(),
    location_notes: faker.random.words(),
    location_lat: faker.address.latitude(),
    location_lng: faker.address.longitude(),
    location_address: `${faker.address.streetAddress()}`,
    ...eventData,
  }
}

export const Event = async (knex: Knex, eventData?: IEvent): Promise<EventModel> => {
  return EventModel.query(knex).insert(event(eventData))
}

import * as Knex from 'knex'
import { ILocation, Location as LocationModel } from '../../server/src/models/location.model'

export const location = (locationData?: ILocation): ILocation => {
  return {
    name: 'Salt Lake City',
    ...locationData,
  }
}

export const Location = async (knex: Knex, locationData?: ILocation): Promise<LocationModel> => {
  return LocationModel.query(knex).insert(location(locationData))
}

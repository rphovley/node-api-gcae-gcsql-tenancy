import * as Knex from "knex"
import { iLocation, Location as LocationModel } from '../../server/src/models/location.model'

export const location = (location?: iLocation): iLocation =>{
  return { 
    name: "Salt Lake City",
    ...location,  
  }
}

export const Location = async (knex: Knex, locationData?: iLocation): Promise<LocationModel> => {
  return await LocationModel.query(knex).insert(location(locationData))
}

import * as Knex from 'knex'
import { ICar, Car as CarModel } from '../../server/src/models/car.model'

export const car = (carData?: ICar): ICar => {
  return {
    name: 'Red Leader',
    plate: 'R3dL3ad3r',
    year: '2019',
    type: '3',
    ...carData,
  }
}

export const Car = async (knex: Knex, carData?: ICar): Promise<CarModel> => {
  return CarModel.query(knex).insert(car(carData))
}

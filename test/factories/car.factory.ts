import * as Knex from "knex"
import { iCar, Car as CarModel } from '../../server/src/models/car.model'

export const car = (car?: iCar): iCar =>{
  return { 
    name: "Red Leader", 
    plate: "R3dL3ad3r", 
    year: "2019", 
    type: "3",
    ...car,  
  }
}

export const Car = async (knex: Knex, carData?: iCar): Promise<CarModel> => {
  return await CarModel.query(knex).insert(car(carData))
}


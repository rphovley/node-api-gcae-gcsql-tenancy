import { BaseModel } from './base.model'

export enum CarType {
  Three = "Three",
  S = "S",
  X = "X"
}

export interface iCar {
  name: string
  plate: string
  year: string
  type: CarType
}

export class Car extends BaseModel implements iCar{
  name: string
  plate: string
  year: string
  type: CarType
  static tableName = 'car'

}

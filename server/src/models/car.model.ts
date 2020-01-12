import { BaseModel } from './base.model'

export enum CarType {
  Three = 'Three',
  S = 'S',
  X = 'X'
}

export interface ICar {
  name: string
  plate: string
  year: string
  type: CarType
}

export class Car extends BaseModel implements ICar {
  name: string
  plate: string
  year: string
  type: CarType
  static tableName = 'car'
}

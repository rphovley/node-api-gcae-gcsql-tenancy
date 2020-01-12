// import { Model } from 'objection'
import { BaseModel } from './base.model'

export interface iCar {
  name: string
  plate: string
  year: string
  type: "3" | "S" | "X"
}

export class Car extends BaseModel implements iCar{
  name: string
  plate: string
  year: string
  type: "3" | "S" | "X"
  static tableName = 'car'

  // static relationMappings = {
  //   endpoints: {
  //     relation: Model.HasManyRelation,
  //     modelClass: Endpoint,
  //     join: {
  //       from: 'import.id',
  //       to: 'endpoint.import_id',
  //     },
  //   },
  // }
}

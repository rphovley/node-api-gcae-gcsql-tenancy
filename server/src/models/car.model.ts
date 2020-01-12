// import { Model } from 'objection'
import { BaseModel } from './base.model'


export class Car extends BaseModel {
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

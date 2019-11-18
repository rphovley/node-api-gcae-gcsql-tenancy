import { Model } from 'objection'
import { BaseModel } from './base.model'
import { Endpoint } from './endpoint.model'


export class Import extends BaseModel {

  static tableName = 'import'

  static relationMappings = {
    endpoints: {
      relation: Model.HasManyRelation,
      modelClass: Endpoint,
      join: {
        from: 'import.id',
        to: 'endpoint.import_id'
      }
    }
  }
}

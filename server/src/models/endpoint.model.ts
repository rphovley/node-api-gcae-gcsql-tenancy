import { ValidationError, Model } from 'objection'
import { BaseModel } from './base.model'
import { Param } from './param.model'
import { QueryParam } from './query_param.model'

export enum ApiService {
  intrinio,
  polygonio
}

export class Endpoint extends BaseModel {
  static tableName = 'endpoint'
  api_service: string
  params: Param[]
  query_params: QueryParam[]
  
  static relationMappings = {
    params: {
      relation: Model.HasManyRelation,
      modelClass: Param,
      join: {
        from: 'endpoint.id',
        to: 'param.endpoint_id'
      }
    },
    query_params: {
      relation: Model.HasManyRelation,
      modelClass: QueryParam,
      join: {
        from: 'endpoint.id',
        to: 'query_param.endpoint_id'
      }
    }
  }

  $beforeInsert() {
    super.$beforeInsert()
    this.validateApiService()
  }

  $beforeUpdate() {
    super.$beforeUpdate()
    this.validateApiService()
  }

  private validateApiService = () =>{
    if (ApiService[this.api_service] == undefined) { //if api_service is not one of the services in the ApiService enum
      throw new ValidationError({
        message: 'api_service is not a valid value (intrinio or polygonio)',
        type: 'ApiServiceInvalidError',
        data: this.toJSON()
      })
    }
  }
}
import { BaseModel } from './base.model'

export class Endpoint extends BaseModel {
  static get tableName() {
    return 'endpoint'
  }
}
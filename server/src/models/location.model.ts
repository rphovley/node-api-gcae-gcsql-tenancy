import { BaseModel } from './base.model'


export interface iLocation {
  name: string
}

export class Location extends BaseModel implements iLocation {
  name: string
  static tableName = 'location'
}

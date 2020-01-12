import { BaseModel } from './base.model'


export interface ILocation {
  name: string
}

export class Location extends BaseModel implements ILocation {
  name: string
  static tableName = 'location'
}

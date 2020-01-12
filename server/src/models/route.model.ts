import { Model } from 'objection'
import { BaseModel } from './base.model'
import { Location } from './location.model'


export interface iRoute {
  name: string
  starts_at_id: number
  ends_at_id: number
}

export class Route extends BaseModel implements iRoute {
  name: string
  starts_at_id: number
  ends_at_id: number
  static tableName = 'route'

  static relationMappings = {
    starts_at: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      join: {
        from: 'route.starts_at_id',
        to: 'location.id',
      },
    },
    ends_at: {
      relation: Model.BelongsToOneRelation,
      modelClass: Location,
      join: {
        from: 'route.ends_at_id',
        to: 'location.id',
      },
    },
  }
}

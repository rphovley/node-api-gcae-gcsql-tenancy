import { Model } from 'objection'
import { BaseModel } from './base.model'
import { Location } from './location.model'
import { RouteTimeBlock } from './route_time_block.model'


export interface IRoute {
  name: string
  starts_at_id: number
  ends_at_id: number
}

export class Route extends BaseModel implements IRoute {
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
    time_blocks: {
      relation: Model.HasManyRelation,
      modelClass: RouteTimeBlock,
      join: {
        from: 'route_time_block.route_id',
        to: 'route.id',
      },
    },
  }
}

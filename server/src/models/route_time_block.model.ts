import { Model } from 'objection'
import { BaseModel } from './base.model'

export interface iRouteTimeBlock {
  name: string
  start_time: string
  end_time: string
  route_id: number
}

export class RouteTimeBlock extends BaseModel implements iRouteTimeBlock {
  name: string
  start_time: string
  end_time: string
  route_id: number
  static tableName = 'route_time_block'
  
  static get relationMappings() { 
    return {
      route: {
        relation: Model.BelongsToOneRelation,
        modelClass: 'route.model',
        join: {
          from: 'route_time_block.route_id',
          to: 'route.id',
        },
      }
    }
  }
}

import { Model } from 'objection'
import { BaseModel } from './base.model'
import { CarType } from './car.model'
import { Route } from './route.model'

export interface IPrice {
  price: string
  route_id: number
  car_type: CarType
}

export class Price extends BaseModel implements IPrice {
  price: string
  route_id: number
  car_type: CarType

  static tableName = 'price'

  static relationMappings = {
    route: {
      relation: Model.BelongsToOneRelation,
      modelClass: Route,
      join: {
        from: 'price.route_id',
        to: 'route.id',
      },
    },
  }
}

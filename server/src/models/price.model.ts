import { Model, ValidationError } from 'objection'
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

  $beforeInsert(): void {
    super.$beforeInsert()
    this.validateCarType()
  }

  $beforeUpdate(): void {
    super.$beforeUpdate()
    this.validateCarType()
  }

  private validateCarType = (): void => {
    // if car type is not one of the types in the CarType enum
    if (CarType[this.car_type] == undefined) {
      throw new ValidationError({
        message: 'The type is not a valid value (Three, S, X)',
        type: 'CarTypeInvalidError',
        data: this.toJSON(),
      })
    }
  }
}

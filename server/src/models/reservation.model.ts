import { Model, ValidationError } from 'objection'
import { BaseModel } from './base.model'
import { Car } from './car.model'
import { RouteTimeBlock } from './route_time_block.model'
import { AppUser } from './app_user.model'

export enum Status {
  started = 'started',
  approved = 'approved',
  rejected = 'rejected'
}

export interface IReservation {
  date: string
  status: Status
  route_time_block_id: number
  car_id: number
  app_user_id: number
}

export class Reservation extends BaseModel implements IReservation {
  date: string
  status: Status
  route_time_block_id: number
  car_id: number
  app_user_id: number
  static tableName = 'reservation'

  static relationMappings = {
    car: {
      relation: Model.BelongsToOneRelation,
      modelClass: Car,
      join: {
        from: 'reservation.car_id',
        to: 'car.id',
      },
    },
    route_time_block: {
      relation: Model.BelongsToOneRelation,
      modelClass: RouteTimeBlock,
      join: {
        from: 'reservation.route_time_block_id',
        to: 'route_time_block.id',
      },
    },
    app_user: {
      relation: Model.BelongsToOneRelation,
      modelClass: AppUser,
      join: {
        from: 'reservation.app_user_id',
        to: 'app_user.id',
      },
    },
  }

  $beforeInsert(): void {
    super.$beforeInsert()
    this.validateStatus()
  }

  $beforeUpdate(): void {
    super.$beforeUpdate()
    this.validateStatus()
  }

  private validateStatus = (): void => {
    // if status is not one of the types in the Status enum
    if (Status[this.status] == undefined) {
      throw new ValidationError({
        message: 'The status is not a valid value (started, approved, rejected)',
        type: 'StatusInvalidError',
        data: this.toJSON(),
      })
    }
  }
}

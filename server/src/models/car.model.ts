import { ValidationError } from 'objection'
import { BaseModel } from './base.model'

export enum CarType {
  Three = 'Three',
  S = 'S',
  X = 'X'
}

export interface ICar {
  name: string
  plate: string
  year: string
  type: CarType
}

export class Car extends BaseModel implements ICar {
  name: string
  plate: string
  year: string
  type: CarType
  static tableName = 'car'

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
    if (CarType[this.type] == undefined) {
      throw new ValidationError({
        message: 'The type is not a valid value (Three, S, X)',
        type: 'CarTypeInvalidError',
        data: this.toJSON(),
      })
    }
  }
}

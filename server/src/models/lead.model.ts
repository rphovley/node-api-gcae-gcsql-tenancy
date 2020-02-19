import { BaseModel, IBaseModel } from './base.model'

export interface ILead extends IBaseModel{
  first_name: string
  last_name: string
  email: string
  phone_number: string
  opt_out: boolean
  login_id: number
}

export class Lead extends BaseModel implements ILead {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  opt_out: boolean
  login_id: number

  static tableName = 'lead'

  static get jsonSchema(): {} {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'phone_number', 'opt_out', 'login_id'],
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' },
        phone_number: { type: 'string' },
        opt_out: { type: 'boolean' },
        login_id: { type: 'number' },
      },
    }
  }
}

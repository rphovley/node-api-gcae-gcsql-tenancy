import * as Knex from 'knex'
import { IPrice, Price as PriceModel } from '../../server/src/models/price.model'

export const price = (priceData: IPrice): IPrice => {
  return priceData
}

export const Price = async (knex: Knex, priceData?: IPrice): Promise<PriceModel> => {
  return PriceModel.query(knex).insert(price(priceData))
}

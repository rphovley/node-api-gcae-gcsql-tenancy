import * as Knex from "knex"
import { iPrice, Price as PriceModel } from '../../server/src/models/price.model'

export const price = (price: iPrice): iPrice =>{
  return price
}

export const Price = async (knex: Knex, priceData?: iPrice): Promise<PriceModel> => {
  return await PriceModel.query(knex).insert(price(priceData))
}
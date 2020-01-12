import * as Knex from 'knex'
import { IRoute, Route as RouteModel } from '../../server/src/models/route.model'

export const route = (routeData: IRoute): IRoute => {
  return routeData
}

export const Route = async (knex: Knex, routeData?: IRoute): Promise<RouteModel> => {
  return RouteModel.query(knex).insert(route(routeData))
}

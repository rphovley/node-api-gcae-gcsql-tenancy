import * as Knex from "knex"
import { iRoute, Route as RouteModel } from '../../server/src/models/route.model'

export const route = (route: iRoute): iRoute =>{
  return route
}

export const Route = async (knex: Knex, routeData?: iRoute): Promise<RouteModel> => {
  return await RouteModel.query(knex).insert(route(routeData))
}
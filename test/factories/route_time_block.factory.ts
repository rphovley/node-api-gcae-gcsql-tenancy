import * as Knex from "knex"
import { iRouteTimeBlock, RouteTimeBlock as RouteTimeBlockModel } from '../../server/src/models/route_time_block.model'

export const routeTimeBlock = (routeTimeBlock: iRouteTimeBlock): iRouteTimeBlock =>{
  return routeTimeBlock
}

export const RouteTimeBlock = async (knex: Knex, routeTimeBlockData?: iRouteTimeBlock): Promise<RouteTimeBlockModel> => {
  return await RouteTimeBlockModel.query(knex).insert(routeTimeBlock(routeTimeBlockData))
}
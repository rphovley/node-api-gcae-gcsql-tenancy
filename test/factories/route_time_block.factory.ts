import * as Knex from 'knex'
import { IRouteTimeBlock, RouteTimeBlock as RouteTimeBlockModel } from '../../server/src/models/route_time_block.model'

export const routeTimeBlock = (routeTimeBlockData: IRouteTimeBlock): IRouteTimeBlock => {
  return routeTimeBlockData
}

export const RouteTimeBlock = async (knex: Knex, routeTimeBlockData?: IRouteTimeBlock): Promise<RouteTimeBlockModel> => {
  return RouteTimeBlockModel.query(knex).insert(routeTimeBlock(routeTimeBlockData))
}

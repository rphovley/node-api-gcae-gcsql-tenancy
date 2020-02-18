import { Request as BaseRequest, Response as BaseResponse, NextFunction as BaseNextFunction } from 'express'
import { AppUser } from '../models/app_user.model'

import Knex = require('knex')

export interface Request extends BaseRequest
{
  appUser: AppUser;
  knex: Knex;
}

export type Response = BaseResponse

export type NextFunction = BaseNextFunction

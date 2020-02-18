import { Request as BaseRequest, Response as BaseResponse, NextFunction as BaseNextFunction } from 'express'
import { AppUser } from '../models/app_user.model'

export interface Request extends BaseRequest
{
  appUser: AppUser;
  models: {};
}

export type Response = BaseResponse

export type NextFunction = BaseNextFunction

import { Request, Response, NextFunction } from './express'
import { CustomErrors, BaseError } from '../utils/customErrors'
import { initializeFirebase, admin } from '../utils/firebase_config'
import { Roles, IAppUser } from '../models/app_user.model'
import { getLogger } from '../utils/logger'

type IRoutePermissions = {
  [key: string]: Roles[]
}

const routePermissions: IRoutePermissions = {
  '/admin/app_users': ['speaker'],
}

function isAdmin(user): boolean {
  return user.roles.includes('admin')
}

// Validate that the user has the correct role/permissions for the requested resource
export const authorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log(req.url)
  // admins can access all resources
  if (!isAdmin(req.appUser)) {
    const sufficient = routePermissions[req.url].some(role => req.appUser.roles.includes(role))
    if (!sufficient) { next(new CustomErrors.PermissionDenied()) }
  }
  next()
}

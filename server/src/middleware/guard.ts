import { NextFunction } from 'express'
import { CustomErrors } from '../utils/customErrors'

class Guard {
  private options: GuardOptions = {
    requestProperty: 'user',
    userRolesProperty: 'roles',
  }


  public check(requiredRoles: string[]): (Request, Response, NextFunction) => void {
    if (typeof requiredRoles === 'string') requiredRoles = [requiredRoles]
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req[this.options.requestProperty]
      if (!user) {
        return next(new CustomErrors.PermissionDenied('user object not found, check configuration'))
      }
      const userRoles = user[this.options.userRolesProperty]
      if (!Array.isArray(userRoles)) {
        return next(new CustomErrors.PermissionDenied('User userRoles should be an array. Check configuration'))
      }
      const sufficient = requiredRoles.some(v => userRoles.includes(v))
      if (!sufficient) {
        return next(new CustomErrors.PermissionDenied())
      }
      return next() // good to go
    }
  }
}

interface GuardOptions {
  requestProperty: string
  userRolesProperty: string
}

export const guard = new Guard()

import { RequestHandler, Dictionary } from 'express-serve-static-core'
import { CustomErrors } from '../utils/customErrors'

class Guard {
  private options: GuardOptions

  constructor(options = {}) {
    const defaults = {
      requestProperty: 'user',
      permissionsProperty: 'roles',
    }
    this.options = { ...defaults, ...options }
  }

  public check(required: string[]): RequestHandler<Dictionary<string>> {
    if (typeof required === 'string') required = [required]
    function middleware(req, res, next): void {
      const user = req[this.options.requestProperty]
      if (!user) {
        return next(new CustomErrors.PermissionDenied('user object not found, check configuration'))
      }
      const permissions = user[this.options.permissionsProperty]
      if (!Array.isArray(permissions)) {
        return next(new CustomErrors.PermissionDenied('User permissions should be an array. Check configuration'))
      }
      const sufficient = required.some(v => permissions.includes(v))
      if (!sufficient) {
        return next(new CustomErrors.PermissionDenied())
      }
      return next() // good to go
    }
    return middleware.bind(this)
  }
}

interface GuardOptions {
  requestProperty: string
  permissionsProperty: string
}

export const guard = new Guard()

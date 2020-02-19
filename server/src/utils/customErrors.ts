/**
 * Custom Errors are used when a developer wants the error to be displayed to the end user
 * All other errors are reported internally
 */
interface ErrorBase extends Error {
  readonly name: string
  readonly message: string
  readonly stack?: string
  readonly status?: string
}

export class BaseError extends Error {
  public message: string
  public status: number

  public constructor(message: string, status = 500) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = status
  }
}

export namespace AuthErrors {
  export class NotFoundError extends BaseError {
    constructor(message: string, model?: string) {
      super(message || `${model} does not exist`, 404)
    }
  }

  export class FirebaseError extends BaseError {
    constructor(message?: string) {
      super(message || 'Token is missing or invalid.', 400)
    }
  }

  export class UnauthorizedError extends BaseError {
    constructor(message?: string) {
      super(message || 'Unauthorized', 401)
    }
  }

  export class UserNotFoundUnauthorizedError extends BaseError {
    constructor(message?: string) {
      super(message || 'Unauthorized', 401)
    }
  }

  export class PermissionDenied extends BaseError {
    constructor(message?: string) {
      super(message || 'Permission Denied', 403)
    }
  }

  export class UserDoesNotExistError extends BaseError {
    constructor(message?: string) {
      super(message || 'User Does Not Exist', 422)
    }
  }

  export class TokenExpiredError extends BaseError {
    constructor(message?: string) {
      super(message || 'User token expired', 401)
    }
  }

  export class TenantIdMissing extends BaseError {
    constructor(message?: string) {
      super(message || 'Tenant id provided is missing or incorrect.', 422)
    }
  }
}

export namespace UtilErrors {
  export class DateFormatError extends BaseError {
    constructor(message?: string) {
      super(message || 'Date formatted incorrectly. Expected ISO string.', 401)
    }
  }
}

export namespace ValidationErrors {
  export class MissingBodyError extends BaseError {
    constructor(message?: string) {
      super(message || 'Body missing from request', 422)
    }
  }
  export class MissingFieldError extends BaseError {
    constructor(message?: string) {
      super(message || 'Body required missing field', 422)
    }
  }
}

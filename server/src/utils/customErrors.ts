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

export namespace CustomErrors {

  export class NotFoundError extends BaseError {
    constructor(message: string, model?: string) {
      super(message || `${model} does not exist`, 404)
    }
  }

  export class UnauthorizedError extends BaseError{
    constructor(message?: string) {    
      super(message || 'Unauthorized', 401)
    }
  }

  export class PermissionDenied extends BaseError{
    constructor(message?: string) {
      super(message || 'Permission Denied', 403)
    }
  }
}

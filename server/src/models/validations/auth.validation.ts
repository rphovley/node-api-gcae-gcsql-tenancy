import { ISignupUser } from '../app_user.model'
import { BaseValidation } from './base.validation'
import { ValidationErrors, AuthErrors } from '../../utils/customErrors'
import { Request } from '../../middleware/express'

export class AuthValidation extends BaseValidation {
  static validateSignup(req: Request): void {
    const { body, headers } = req as {body: ISignupUser, headers}
    super.validate(body)
    if (!headers.tenantid) throw new AuthErrors.TenantIdMissing()
    if (!body.email) throw new ValidationErrors.MissingFieldError('Body missing email field')
  }
}

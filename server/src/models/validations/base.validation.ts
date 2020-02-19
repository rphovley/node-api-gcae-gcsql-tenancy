import { ValidationErrors } from '../../utils/customErrors'

export class BaseValidation {
  static validate(body: {}): void {
    if (!body) throw new ValidationErrors.MissingBodyError()
  }
}

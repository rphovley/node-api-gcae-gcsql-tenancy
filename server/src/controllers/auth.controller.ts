import { Request, Response, NextFunction } from 'express'

export class AuthController {
  public static login(req: Request, res: Response, next: NextFunction): void {
    res.send('login')
  }
}

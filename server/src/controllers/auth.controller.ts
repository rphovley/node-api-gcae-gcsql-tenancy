import { Request, Response, NextFunction } from 'express'

export class AuthController {

  public login(req: Request, res: Response, next: NextFunction): void {
    res.send('login')
  }
}

import { Request, Response, NextFunction } from 'express'

export class AuthController {
  public static signup(req: Request, res: Response, next: NextFunction): void {
    // receive google data and the related rider information
    res.send('signup')
  }
}

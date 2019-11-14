import { Request, Response, NextFunction } from 'express'

export class TestController {

  public test(req: Request, res: Response, next: NextFunction): void {
    res.send('testing')
  }
  public echo(req: Request, res: Response, next: NextFunction): void {
    const body = req.body.hello
    if (!body) {
      return next({
        status: 400,
        message: 'You didn\'t provide a "hello" in the request'
      })
    }
    res.send(body)
  }
  public protectedIndex(req: Request, res: Response, next: NextFunction): void {
    res.send('Successfully hit the protected endpoint')
  }
}

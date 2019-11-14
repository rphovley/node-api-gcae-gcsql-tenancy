import { BaseRoute } from './base.route'
import { Router, Request, Response, NextFunction } from 'express'
import { TestController } from '../controllers/test.controller'
import { guard } from '../middleware/guard'

export class TestRoute extends BaseRoute {
  public static create(router: Router): void {

    router.get('/api/test', (req: Request, res: Response, next: NextFunction) => {
      new TestController().test(req, res, next)
    })
    router.post('/api/test/echo', (req: Request, res: Response, next: NextFunction) => {
      new TestController().echo(req, res, next)
    })
    router.get('/api/test/protected', guard.check(['admin']), (req: Request, res: Response, next: NextFunction) => {
      new TestController().protectedIndex(req, res, next)
    })
  }
}

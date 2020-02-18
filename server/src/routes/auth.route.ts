import { Router } from 'express'
import { login, signup } from '../controllers/auth.controller'

export class AuthRoute {
  public static create(router: Router): void {
    router.post('/api/auth/login', login)
    router.post('/api/auth/signup', signup)
  }
}

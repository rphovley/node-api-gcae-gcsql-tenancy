import { Router } from 'express'
import { index, show, create, update, del } from '../../controllers/admin/app_user.controller'

export class AppUserRoute {
  public static create(router: Router): void {
    router.get('/api/admin/app_users', index)
    router.get('/api/admin/app_users/:id', show)
    router.post('/api/admin/app_users', create)
    router.put('/api/admin/app_users/:id', update)
    router.delete('/api/admin/app_users/:id', del)
  }
}

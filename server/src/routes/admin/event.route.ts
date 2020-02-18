import { Router } from 'express'
import { index, show, create, update, del } from '../../controllers/admin/event.controller'

export class EventRoute {
  public static create(router: Router): void {
    router.get('/api/admin/events', index)
    router.get('/api/admin/events/:id', show)
    router.post('/api/admin/events', create)
    router.put('/api/admin/events/:id', update)
    router.delete('/api/admin/events/:id', del)
  }
}

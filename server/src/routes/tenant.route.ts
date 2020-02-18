import { Router } from 'express'
import { index } from '../controllers/tenant.controller'

export class TenantRoute {
  public static create(router: Router): void {
    router.get('/api/tenant', index)
  }
}

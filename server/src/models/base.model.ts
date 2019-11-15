import { Model } from 'objection'

export class BaseModel extends Model {
  created_at: string
  updated_at: string

  $beforeInsert(): void {
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }

  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString()
  }
}

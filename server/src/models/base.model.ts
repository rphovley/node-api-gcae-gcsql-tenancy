import { Model } from 'objection'

export interface IBaseModel {
  id: number
  created_at: string
  updated_at: string
}

export class BaseModel extends Model implements IBaseModel {
  id: number
  created_at: string
  updated_at: string
  static get modelPaths(): string[] {
    return [__dirname]
  }
  $beforeInsert(): void {
    this.created_at = new Date().toISOString()
    this.updated_at = new Date().toISOString()
  }
  $beforeUpdate(): void {
    this.updated_at = new Date().toISOString()
  }
}

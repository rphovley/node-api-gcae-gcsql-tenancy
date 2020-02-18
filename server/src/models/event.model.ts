import { BaseModel } from './base.model'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const roles = <const> ['admin', 'attendee', 'speaker']
export type Roles = typeof roles[number]

export interface IEvent {
  name: string
  event_type: string
  content_type: string
  industry: string
  location_name: string
  location_notes: string
  location_lat: string
  location_lng: string
  location_address: string
  location_map: string
}

export class Event extends BaseModel implements IEvent {
  name: string
  event_type: string
  content_type: string
  industry: string
  location_name: string
  location_notes: string
  location_lat: string
  location_lng: string
  location_address: string
  location_map: string
  static tableName = 'app_user'
}

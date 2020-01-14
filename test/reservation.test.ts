import assert from 'assert'
import { describe, it } from 'mocha'
import { Reservation as ReservationModel } from '../server/src/models/reservation.model'
import { Car } from './factories/car.factory'
import { AppUser } from './factories/app_user.factory'
import { Route } from './factories/route.factory'
import { initConnection } from '../server/src/utils/db_config'

require('ts-node/register')

const knex = initConnection()

const arr = [1, 2, 3]

const seedDatabase = async () => {
  ReservationModel.bindKnex(knex).getReservations(await AppUser(knex), await Car(knex), await Route(knex), (new Date()).toISOString())
}

seedDatabase()

describe('Reservation#Model', () => {
  describe('Approved User', () => {
    describe('Available route/car', () => {
      describe('Acceptable date range', () => {

      })
      describe('Unnacapteable date range', () => {

      })
    })
    describe('Unavailable route/car', () => {

    })
  })
  describe('Unnaproved User', () => {

  })

  describe('Request route with available car at a time within acceptable date range', () => {
    it('#200 when user is approved', () => {

    })
    it('#')
  })
  describe('request route with available car at a time within unacceptable date range (beyond a week from today)', () => {
    it('', () => {
      assert.equal(arr.indexOf(4), -1)
    })
    it('#422 when user not approved', () => {

    })
  })
  describe('request route with unavailable car at a time within acceptable range', () => {
    it('', () => {
      assert.equal(arr.indexOf(4), -1)
    })
  })
})

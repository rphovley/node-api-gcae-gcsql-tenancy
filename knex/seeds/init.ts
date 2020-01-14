import * as Knex from 'knex'
import { CarType } from '../../server/src/models/car.model'
import { Status } from '../../server/src/models/reservation.model'
import { Car } from '../../test/factories/car.factory'
import { Location } from '../../test/factories/location.factory'
import { AppUser } from '../../test/factories/app_user.factory'
import { Route } from '../../test/factories/route.factory'
import { RouteTimeBlock } from '../../test/factories/route_time_block.factory'
import { Price } from '../../test/factories/price.factory'
import { Reservation } from '../../test/factories/reservation.factory'

export async function seed(knex: Knex): Promise<void> {
  // Clean db
  await deleteRecords(knex)
  // Car Seeds
  const redLeader = await Car(knex, { name: 'Red Leader', plate: 'R3dL3ad3r', year: '2019', type: CarType.Three })
  const redOctober = await Car(knex, { name: 'Red October', plate: 'R3dOctob3r', year: '2019', type: CarType.Three })

  // Location Seeds
  const slc = await Location(knex, { name: 'Salt Lake City' })
  const stGeorge = await Location(knex, { name: 'St. George' })

  // User Seeds
  const elon = await AppUser(knex, {
    firebase_id: 'UD80FuSVhJWkX0Qa8psDWxnVoM53',
    first_name: 'Elon',
    last_name: 'Musk',
    roles: ['admin'],
    current_license_img: '',
    current_license_exp: '',
    current_insurance_img: '',
    current_insurance_exp: '',
  })
  const rider1 = await AppUser(knex)

  // Route Seeds
  const slcToStGeorge = await Route(knex, { name: 'SLC to St. George', starts_at_id: slc.id, ends_at_id: stGeorge.id })
  const stGeorgeToSLC = await Route(knex, { name: 'St. George to SLC', starts_at_id: stGeorge.id, ends_at_id: slc.id })

  // Route Time Block Seeds
  const slcToStGeorgeMorning = await RouteTimeBlock(knex, { name: 'SLC to St. George Morning', start_time: '8:00 am', end_time: '5:00 pm', route_id: slcToStGeorge.id })
  const slcToStGeorgeEvening = await RouteTimeBlock(knex, { name: 'SLC to St. George Evening', start_time: '6:00 pm', end_time: '7:00 am', route_id: slcToStGeorge.id })
  const stGeorgeToSLCMorning = await RouteTimeBlock(knex, { name: 'St. George to SLC Morning', start_time: '8:00 am', end_time: '5:00 pm', route_id: stGeorgeToSLC.id })
  const stGeorgeToSLCEvening = await RouteTimeBlock(knex, { name: 'St. George to SLC Evening', start_time: '6:00 pm', end_time: '7:00 am', route_id: stGeorgeToSLC.id })

  // Price Seeds
  const slcToStGeorge3Price = await Price(knex, { price: '120', car_type: CarType.Three, route_id: slcToStGeorge.id })
  const stGeorgeToSLC3Price = await Price(knex, { price: '120', car_type: CarType.Three, route_id: slcToStGeorge.id })

  // Reservation Seeds
  const rider1RedRiderMorningDec3 = await Reservation(knex, {
    app_user_id: rider1.id,
    route_time_block_id: slcToStGeorgeMorning.id,
    car_id: redLeader.id,
    date: (new Date('12-03-2019')).toISOString(),
    status: Status.started,
  })
  const rider1RedRiderEveningDec3 = await Reservation(knex, {
    app_user_id: rider1.id,
    route_time_block_id: slcToStGeorgeEvening.id,
    car_id: redLeader.id,
    date: (new Date('12-03-2019')).toISOString(),
    status: Status.started,
  })
  const elonRedRiderEveningDec3 = await Reservation(knex, {
    app_user_id: elon.id,
    route_time_block_id: stGeorgeToSLCEvening.id,
    car_id: redLeader.id,
    date: (new Date('12-04-2019')).toISOString(),
    status: Status.started,
  })
}

const deleteRecords = async (knex: Knex): Promise<void> => {
  await knex('reservation').del()
  await knex('price').del()
  await knex('route_time_block').del()
  await knex('route').del()
  await knex('app_user').del()
  await knex('location').del()
  await knex('car').del()
}

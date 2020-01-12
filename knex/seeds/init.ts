import * as Knex from "knex"
import { Car } from '../../test/factories/car.factory'
import { Location } from '../../test/factories/location.factory'
import { AppUser } from '../../test/factories/app_user.factory'
import { route, Route } from '../../test/factories/route.factory.ts'

export async function seed(knex: Knex): Promise<void> {
  //Car Seeds
  await knex("car").del()     
  const redLeader = await Car(knex, { name: "Red Leader", plate: "R3dL3ad3r", year: "2019", type: "3" })
  const redOctober = await Car(knex, { name: "Red October", plate:"R3dOctob3r", year: "2019", type: "3" })

  //Location Seeds
  await knex("location").del()
  const slc = await Location(knex, { name: "Salt Lake City"})
  const stGeorge = await Location(knex, { name: "St. George" })

  //User Seeds
  await knex("app_user").del()
  const elon = await AppUser(knex, { 
    firebase_id: "xxxxxx",
    first_name: "Elon",
    last_name: "Musk",
    roles: ["admin"],
    current_license_img: "",
    current_license_exp: "",
    current_insurance_img: "",
    current_insurance_exp: "",
  })
  const rider1 = await AppUser(knex)

  //Route Seeds
  await knex("route").del()
  const slcToStGeorge = await Route(knex, { name: "SLC to St. George", starts_at_id: slc.id, ends_at_id: stGeorge.id })
  const stGeorgeToSLC = await Route(knex, { name: "St. George to SLC", starts_at_id: stGeorge.id, ends_at_id: slc.id })
}

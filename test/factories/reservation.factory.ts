import * as Knex from "knex"
import { iReservation, Reservation as ReservationModel } from '../../server/src/models/reservation.model'

export const reservation = (reservation: iReservation): iReservation =>{
  return reservation
}

export const Reservation = async (knex: Knex, reservationData?: iReservation): Promise<ReservationModel> => {
  return await ReservationModel.query(knex).insert(reservation(reservationData))
}
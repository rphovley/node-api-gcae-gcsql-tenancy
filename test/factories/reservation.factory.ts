import * as Knex from 'knex'
import { IReservation, Reservation as ReservationModel } from '../../server/src/models/reservation.model'

export const reservation = (reservationData: IReservation): IReservation => {
  return reservationData
}

export const Reservation = async (knex: Knex, reservationData?: IReservation): Promise<ReservationModel> => {
  return ReservationModel.query(knex).insert(reservation(reservationData))
}

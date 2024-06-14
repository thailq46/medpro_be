import {ParamsDictionary} from 'express-serve-static-core'

export interface CreateAppointmentsReqBody {
  doctor_id: string
  patient_id: string
  service_id: string
  address: string
  date: string
  time: string
  date_of_birth: string
  email: string
  fullname: string
  gender: number
  phone_number: string
  price: number
  reason: string
  status: boolean
  isPayment: boolean
}
export interface DeleteAppointmentReqParams extends ParamsDictionary {
  id: string
}

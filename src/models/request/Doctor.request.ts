import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
export interface CreateDoctorsReqBody {
  doctor_id: string
  specialty_id: string
  hospital_id: string
  description: string
  therapy: string
  price: number
  session: string
}
export interface UpdateDoctorsReqBody {
  specialty_id?: string
  hospital_id?: string
  description?: string
  therapy?: string
  price?: number
  session?: string
}
export interface GetDoctorsParamsReq extends ParamsDictionary {
  doctor_id: string
}
export interface QueryDoctors extends Pagination, Query {
  hospital?: string
  specialty?: string
  search?: string
  position?: string
}
export interface QueryDoctorsBySpecialty extends Query {
  hospital_id: string
  specialty_id: string
  search?: string
}

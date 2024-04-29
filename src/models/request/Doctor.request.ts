import {ParamsDictionary} from 'express-serve-static-core'
export interface CreateDoctorsReqBody {
  doctor_id: string
  specialty_id: string
  description: string
  therapy: string
  price: string
  session: string
}
export interface UpdateDoctorsReqBody {
  specialty_id?: string
  description?: string
  therapy?: string
  price?: string
  session?: string
}
export interface GetDoctorsParamsReq extends ParamsDictionary {
  doctor_id: string
}

import {ParamsDictionary} from 'express-serve-static-core'
export interface CreateMedicalBookingFormsReqBody {
  name: string
  image: string | null
}
export interface UpdateMedicalBookingFormsReqBody {
  name?: string
  image?: string | null
}
export interface GetMedicalBookingFormsParams extends ParamsDictionary {
  id: string
}

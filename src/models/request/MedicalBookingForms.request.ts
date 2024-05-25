import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
export interface CreateMedicalBookingFormsReqBody {
  name: string
  image: string | null
  slug: string
}
export interface UpdateMedicalBookingFormsReqBody {
  name?: string
  image?: string | null
  slug?: string
}
export interface GetMedicalBookingFormsParams extends ParamsDictionary {
  id: string
}
export interface QueryMedicalBookingForms extends Pagination, Query {
  search?: string
}

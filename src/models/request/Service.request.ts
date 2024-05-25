import {ParamsDictionary} from 'express-serve-static-core'
import {Query} from 'firebase-admin/database'
import {Pagination} from '~/models/request/Common.request'

export interface CreateServicesReqBody {
  hospital_id: string
  specialty_id: string | null
  name: string
  description: string
  note: string | null
  price: number
  session: string
}
export interface UpdateServicesReqBody {
  hospital_id?: string
  specialty_id?: string | null
  name?: string
  description?: string
  note?: string | null
  price?: number
  session?: string
}
export interface GetServicesParamsReq extends ParamsDictionary {
  id: string
}
export interface QueryServices extends Pagination, Query {
  search?: string
  hospital?: string
  specialty?: string
}

import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
export interface CreateHospitalsReqBody {
  categoryId: string
  name: string
  slug: string
  description: string
  session: string
  start_time: string | null
  end_time: string | null
  hotline: string
  address: string
  avatar: string | null
  banner: string | null
  images: string[] | null
  types: number[]
  booking_forms: string[]
  description_detail?: string | null
}
export interface UpdateHospitalsReqBody {
  categoryId?: string
  name?: string
  slug?: string
  description?: string
  session?: string
  start_time?: string | null
  end_time?: string | null
  hotline?: string
  address?: string
  avatar?: string | null
  banner?: string | null
  images?: string[] | null
  booking_forms?: string[]
  types?: number[]
  description_detail?: string | null
}
export interface GetHospitalsParamsReq extends ParamsDictionary {
  id: string
}
export interface GetHospitalsBySlugParamsReq extends ParamsDictionary {
  slug: string
}
export interface QueryHospitals extends Pagination, Query {
  search?: string
  types?: string
}

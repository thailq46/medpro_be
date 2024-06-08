import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'

export interface CreateSpecialtiesReqBody {
  hospital_id: string
  name: string
  slug: string
  description: string
}
export interface UpdateSpecialtiesReqBody {
  hospital_id?: string
  name?: string
  slug?: string
  description?: string
}
export interface GetSpecialtiesParamsReq extends ParamsDictionary {
  id: string
}
export interface GetHospitalIdParamsReq extends ParamsDictionary {
  hospital_id: string
}
export interface QuerySpecialties extends Pagination, Query {
  hospital?: string
  search?: string
}

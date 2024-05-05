import {ParamsDictionary} from 'express-serve-static-core'

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

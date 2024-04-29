import {ParamsDictionary} from 'express-serve-static-core'

export interface CreateSpecialtiesReqBody {
  hostipal_id: string
  name: string
  slug: string
  description: string
}
export interface UpdateSpecialtiesReqBody {
  hostipal_id?: string
  name?: string
  slug?: string
  description?: string
}
export interface GetSpecialtiesParamsReq extends ParamsDictionary {
  id: string
}

import {ParamsDictionary} from 'express-serve-static-core'

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

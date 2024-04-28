import {ParamsDictionary} from 'express-serve-static-core'
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
}
export interface GetHospitalsParamsReq extends ParamsDictionary {
  id: string
}

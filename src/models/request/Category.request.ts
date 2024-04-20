import {ParamsDictionary} from 'express-serve-static-core'
export interface CreateCateReqBody {
  name: string
  slug: string
  parent_id: string | null
}
export interface UpdateCateReqBody {
  name?: string
  slug?: string
  parent_id?: string | null
}
export interface UpdateCateReqParams extends ParamsDictionary {
  id: string
}

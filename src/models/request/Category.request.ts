import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
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
export interface DeleteCateReqParams extends ParamsDictionary {
  id: string
}
export interface GetCateReqParams extends ParamsDictionary {
  id: string
}
export interface QueryCategories extends Pagination, Query {
  search?: string
}

import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
export interface CreateSchedulesReqBody {
  doctor_id: string
  date: string
  time_type: string[]
}
export interface UpdateSchedulesReqBody {
  doctor_id?: string
  date?: string
  time_type?: string[]
}
export interface GetSchedulesReqQuery extends ParamsDictionary {
  id: string
}
export interface GetSchedulesByDoctorID extends ParamsDictionary {
  doctor_id: string
}

export interface QuerySchedules extends Pagination, Query {
  doctor?: string
  date?: string
}

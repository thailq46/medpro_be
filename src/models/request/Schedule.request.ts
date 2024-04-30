import {ParamsDictionary} from 'express-serve-static-core'
export interface CreateSchedulesReqBody {
  doctor_id: string
  current_number?: number
  max_number: number
  date: string
  time_type: string[]
}
export interface UpdateSchedulesReqBody {
  doctor_id?: string
  current_number?: number
  max_number?: number
  date?: string
  time_type?: string[]
}
export interface GetSchedulesReqQuery extends ParamsDictionary {
  id: string
}

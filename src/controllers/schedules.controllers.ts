import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {SCHEDULES_MESSAGE} from '~/constants/messages'
import {Pagination} from '~/models/request/Common.request'
import {
  CreateSchedulesReqBody,
  GetSchedulesByDoctorID,
  GetSchedulesReqQuery,
  QuerySchedules,
  UpdateSchedulesReqBody
} from '~/models/request/Schedule.request'
import schedulesService from '~/services/schedules.service'
import {responseMessage} from '~/utils/common'

export const createSchedulesController = async (
  req: Request<ParamsDictionary, any, CreateSchedulesReqBody>,
  res: Response
) => {
  await schedulesService.createSchedules(req.body)
  return res.json({
    message: SCHEDULES_MESSAGE.CREATE_SCHEDULES_SUCCESSFULLY
  })
}

export const updateSchedulesController = async (
  req: Request<GetSchedulesReqQuery, any, UpdateSchedulesReqBody>,
  res: Response
) => {
  const {id} = req.params
  const result = await schedulesService.updateSchedules(id, req.body)
  return res.json({
    message: SCHEDULES_MESSAGE.UPDATE_SCHEDULES_SUCCESSFULLY,
    data: result
  })
}

export const deleteSchedulesController = async (req: Request<GetSchedulesReqQuery>, res: Response) => {
  const {id} = req.params
  const result = await schedulesService.deleteSchedules(id)
  return res.json({
    message: SCHEDULES_MESSAGE.DELETE_SCHEDULES_SUCCESSFULLY,
    data: result
  })
}

export const getSchedulesByIdController = async (req: Request<GetSchedulesReqQuery>, res: Response) => {
  const {id} = req.params
  const result = await schedulesService.getSchedulesById(id)
  return res.json({
    message: SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
    data: result
  })
}

export const getFullSchedulesController = async (
  req: Request<ParamsDictionary, any, any, QuerySchedules>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {doctor, date} = req.query
  const {schedules, totalItems} = await schedulesService.getFullSchedules({limit, page, doctor, date})
  return res.json(
    responseMessage({
      message: SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
      data: schedules,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}

export const getFullSchedulesByDoctorIdController = async (
  req: Request<GetSchedulesByDoctorID, any, any, Omit<QuerySchedules, 'doctor'>>,
  res: Response
) => {
  console.log('req query', req.query)
  const {doctor_id} = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {date} = req.query
  const {schedules, totalItems} = await schedulesService.getFullSchedulesByDoctorId({
    doctor_id,
    limit,
    page,
    date: date as string
  })
  return res.json(
    responseMessage({
      message: SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
      data: schedules,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}

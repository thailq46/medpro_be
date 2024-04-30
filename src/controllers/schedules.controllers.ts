import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {SCHEDULES_MESSAGE} from '~/constants/messages'
import {CreateSchedulesReqBody, GetSchedulesReqQuery, UpdateSchedulesReqBody} from '~/models/request/Schedule.request'
import schedulesService from '~/services/schedules.service'

export const createSchedulesController = async (
  req: Request<ParamsDictionary, any, CreateSchedulesReqBody>,
  res: Response
) => {
  const result = await schedulesService.createSchedules(req.body)
  return res.json({
    message: SCHEDULES_MESSAGE.CREATE_SCHEDULES_SUCCESSFULLY,
    data: result
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

export const getFullSchedulesController = async (req: Request, res: Response) => {
  const result = await schedulesService.getFullSchedules()
  return res.json({
    message: SCHEDULES_MESSAGE.GET_SCHEDULES_SUCCESSFULLY,
    data: result
  })
}

import {Request, Response} from 'express'
import {DOCTORS_MESSAGE} from '~/constants/messages'
import {ParamsDictionary} from 'express-serve-static-core'
import {CreateDoctorsReqBody, GetDoctorsParamsReq, UpdateDoctorsReqBody} from '~/models/request/Doctor.request'
import doctorsService from '~/services/doctors.service'
import {Pagination} from '~/models/request/Common.request'
import {responseMessage} from '~/utils/common'

export const createDoctorsController = async (
  req: Request<ParamsDictionary, any, CreateDoctorsReqBody>,
  res: Response
) => {
  const result = await doctorsService.createDoctors(req.body)
  return res.json({
    message: DOCTORS_MESSAGE.CREATE_DOCTORS_SUCCESS,
    data: result
  })
}

export const updateDoctorsController = async (
  req: Request<GetDoctorsParamsReq, any, UpdateDoctorsReqBody>,
  res: Response
) => {
  const {doctor_id} = req.params
  const result = await doctorsService.updateDoctors(doctor_id, req.body)
  return res.json({
    message: DOCTORS_MESSAGE.UPDATE_DOCTORS_SUCCESS,
    data: result
  })
}

export const deleteDoctorsController = async (req: Request<GetDoctorsParamsReq>, res: Response) => {
  const {doctor_id} = req.params
  await doctorsService.deleteDoctors(doctor_id)
  return res.json({
    message: DOCTORS_MESSAGE.DELETE_DOCTORS_SUCCESS
  })
}

export const getDoctorsByIdController = async (req: Request<GetDoctorsParamsReq>, res: Response) => {
  const {doctor_id} = req.params
  const result = await doctorsService.getDoctorsById(doctor_id)
  return res.json(
    responseMessage({
      message: DOCTORS_MESSAGE.GET_DOCTORS_SUCCESS,
      data: result
    })
  )
}

export const getFullDoctorsController = async (req: Request<ParamsDictionary, any, any, Pagination>, res: Response) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {doctors, total} = await doctorsService.getFullDoctors({limit, page})
  return res.json(
    responseMessage({
      message: DOCTORS_MESSAGE.GET_DOCTORS_SUCCESS,
      data: doctors,
      meta: {
        current_page: page,
        total_items: total,
        total_page: Math.ceil(total / limit),
        limit
      }
    })
  )
}

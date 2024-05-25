import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {HOSPITALS_MESSAGE} from '~/constants/messages'
import {Pagination} from '~/models/request/Common.request'
import {
  CreateHospitalsReqBody,
  GetHospitalsParamsReq,
  QueryHospitals,
  UpdateHospitalsReqBody
} from '~/models/request/Hospital.request'
import hospitalsService from '~/services/hospitals.service'
import {responseMessage} from '~/utils/common'

export const createHospitalController = async (
  req: Request<ParamsDictionary, any, CreateHospitalsReqBody>,
  res: Response
) => {
  await hospitalsService.createHospital(req.body)
  return res.json({
    message: HOSPITALS_MESSAGE.CREATE_HOSPITAL_SUCCESS
  })
}

export const updateHospitalController = async (
  req: Request<GetHospitalsParamsReq, any, UpdateHospitalsReqBody>,
  res: Response
) => {
  const {id} = req.params
  const result = await hospitalsService.updateHospital(id, req.body)
  return res.json({
    message: HOSPITALS_MESSAGE.UPDATE_HOSPITAL_SUCCESS,
    data: result
  })
}

export const deleteHospitalController = async (req: Request<GetHospitalsParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await hospitalsService.deleteHospital(id)
  return res.json({
    message: HOSPITALS_MESSAGE.DELETE_HOSPITAL_SUCCESS,
    data: result
  })
}

export const getHospitalsByIdController = async (req: Request<GetHospitalsParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await hospitalsService.getHospitalsById(id)
  return res.json(
    responseMessage({
      message: HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
      data: result
    })
  )
}

export const getFullHospitalsController = async (
  req: Request<ParamsDictionary, any, any, QueryHospitals>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {search} = req.query
  const {hospitals, totalItems} = await hospitalsService.getFullHospitals({limit, page, search})
  return res.json(
    responseMessage({
      message: HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
      data: hospitals,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}

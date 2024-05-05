import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {ObjectId} from 'mongodb'
import {HOSPITALS_MESSAGE} from '~/constants/messages'
import {Pagination} from '~/models/request/Common.request'
import {CreateHospitalsReqBody, GetHospitalsParamsReq, UpdateHospitalsReqBody} from '~/models/request/Hospital.request'
import databaseService from '~/services/database.service'
import hospitalsService from '~/services/hospitals.service'

export const createHospitalController = async (
  req: Request<ParamsDictionary, any, CreateHospitalsReqBody>,
  res: Response
) => {
  const result = await hospitalsService.createHospital(req.body)
  return res.json({
    message: HOSPITALS_MESSAGE.CREATE_HOSPITAL_SUCCESS,
    data: result
  })
}

export const updateHospitalController = async (
  req: Request<GetHospitalsParamsReq, any, UpdateHospitalsReqBody>,
  res: Response
) => {
  const {id} = req.params
  // const isExist = await databaseService.hospitals.findOne({_id: new ObjectId(id)})
  // if (!isExist) {
  //   return res.status(404).json({
  //     message: HOSPITALS_MESSAGE.HOSPITAL_NOT_FOUND
  //   })
  // }
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
  return res.json({
    message: HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
    data: result,
    meta: {}
  })
}

export const getFullHospitalsController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {hospitals, totalItems} = await hospitalsService.getFullHospitals({limit, page})
  return res.json({
    message: HOSPITALS_MESSAGE.GET_HOSPITALS_SUCCESS,
    data: hospitals,
    meta: {
      total_page: Math.ceil(totalItems / limit),
      limit,
      current_page: page,
      total_items: totalItems
    }
  })
}

import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {HOSPITALS_MESSAGE} from '~/constants/messages'
import {CreateHospitalsReqBody} from '~/models/request/Hospital.request'
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

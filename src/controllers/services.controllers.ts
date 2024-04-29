import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {SERVICES_MESSAGE} from '~/constants/messages'
import {CreateServicesReqBody, GetServicesParamsReq, UpdateServicesReqBody} from '~/models/request/Service.request'
import servicesService from '~/services/services.service'

export const createServicesController = async (
  req: Request<ParamsDictionary, any, CreateServicesReqBody>,
  res: Response
) => {
  const result = await servicesService.createServices(req.body)
  return res.json({
    message: SERVICES_MESSAGE.CREATE_SERVICES_SUCCESS,
    data: result
  })
}

export const updateServicesController = async (
  req: Request<GetServicesParamsReq, any, UpdateServicesReqBody>,
  res: Response
) => {
  const {id} = req.params
  const result = await servicesService.updateServices(id, req.body)
  return res.json({
    message: SERVICES_MESSAGE.UPDATE_SERVICES_SUCCESS,
    data: result
  })
}

export const deleteServicesController = async (req: Request<GetServicesParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await servicesService.deleteServices(id)
  return res.json({
    message: SERVICES_MESSAGE.DELETE_SERVICES_SUCCESS,
    data: result
  })
}

export const getFullServicesController = async (req: Request, res: Response) => {
  const result = await servicesService.getFullServices()
  return res.json({
    message: SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
    data: result
  })
}

export const getServicesByIdController = async (req: Request<GetServicesParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await servicesService.getServicesById(id)
  return res.json({
    message: SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
    data: result
  })
}

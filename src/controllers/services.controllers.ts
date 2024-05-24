import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {SERVICES_MESSAGE} from '~/constants/messages'
import {Pagination} from '~/models/request/Common.request'
import {CreateServicesReqBody, GetServicesParamsReq, UpdateServicesReqBody} from '~/models/request/Service.request'
import servicesService from '~/services/services.service'
import {responseMessage} from '~/utils/common'

export const createServicesController = async (
  req: Request<ParamsDictionary, any, CreateServicesReqBody>,
  res: Response
) => {
  await servicesService.createServices(req.body)
  return res.json({
    message: SERVICES_MESSAGE.CREATE_SERVICES_SUCCESS
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

export const getFullServicesController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {services, totalItems} = await servicesService.getFullServices({limit, page})
  return res.json(
    responseMessage({
      message: SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
      data: services,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}

export const getServicesByIdController = async (req: Request<GetServicesParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await servicesService.getServicesById(id)
  return res.json(
    responseMessage({
      message: SERVICES_MESSAGE.GET_SERVICES_SUCCESS,
      data: result
    })
  )
}

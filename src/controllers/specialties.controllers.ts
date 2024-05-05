import {Request, Response} from 'express'
import {SPECIALTIES_MESSAGE} from '~/constants/messages'
import {ParamsDictionary} from 'express-serve-static-core'
import {
  CreateSpecialtiesReqBody,
  GetSpecialtiesParamsReq,
  UpdateSpecialtiesReqBody
} from '~/models/request/Specialty.request'
import specialtiesService from '~/services/specialties.service'
import {Pagination} from '~/models/request/Common.request'
import {responseMessage} from '~/utils/common'

export const createSpecialtiesController = async (
  req: Request<ParamsDictionary, any, CreateSpecialtiesReqBody>,
  res: Response
) => {
  const result = await specialtiesService.createSpecialty(req.body)
  return res.json({
    message: SPECIALTIES_MESSAGE.CREATE_SPECIALTY_SUCCESS,
    data: result
  })
}

export const updateSpecialtiesController = async (
  req: Request<GetSpecialtiesParamsReq, any, UpdateSpecialtiesReqBody>,
  res: Response
) => {
  const {id} = req.params
  const result = await specialtiesService.updateSpecialty(id, req.body)
  return res.json({
    message: SPECIALTIES_MESSAGE.UPDATE_SPECIALTY_SUCCESS,
    data: result
  })
}

export const deleteSpecialtiesController = async (req: Request<GetSpecialtiesParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await specialtiesService.deleteSpecialty(id)
  return res.json({
    message: SPECIALTIES_MESSAGE.DELETE_SPECIALTY_SUCCESS,
    data: result
  })
}

export const getSpecialtiesByIdController = async (req: Request<GetSpecialtiesParamsReq>, res: Response) => {
  const {id} = req.params
  const result = await specialtiesService.getSpecialtyById(id)
  return res.json(
    responseMessage({
      message: SPECIALTIES_MESSAGE.GET_SPECIALTIES_SUCCESS,
      data: result
    })
  )
}

export const getFullSpecialtiesController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {specialties, totalItems} = await specialtiesService.getFullSpecialties({limit, page})
  return res.json(
    responseMessage({
      message: SPECIALTIES_MESSAGE.GET_SPECIALTIES_SUCCESS,
      data: specialties,
      meta: {
        limit,
        current_page: page,
        total_items: totalItems,
        total_page: Math.ceil(totalItems / limit)
      }
    })
  )
}

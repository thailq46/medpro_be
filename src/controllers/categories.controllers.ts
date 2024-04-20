import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import {
  CreateCateReqBody,
  DeleteCateReqParams,
  UpdateCateReqBody,
  UpdateCateReqParams
} from '~/models/request/Category.request'
import categoriesService from '~/services/categories.service'

export const createCategoriesController = async (
  req: Request<ParamsDictionary, any, CreateCateReqBody>,
  res: Response
) => {
  const result = await categoriesService.createCategory(req.body)
  return res.json({
    message: CATEGORIES_MESSAGE.CREATE_SUCCESS,
    data: result
  })
}

export const updateCategoriesController = async (
  req: Request<UpdateCateReqParams, any, UpdateCateReqBody>,
  res: Response
) => {
  const {id} = req.params
  return await categoriesService.updateCategory(id, req.body, res)
}

export const deleteCategoriesController = async (req: Request<DeleteCateReqParams>, res: Response) => {
  const {id} = req.params
  return await categoriesService.deleteCategory(id, res)
}

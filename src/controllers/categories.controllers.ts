import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import {
  CreateCateReqBody,
  DeleteCateReqParams,
  GetCateReqParams,
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

export const getFullCategoriesController = async (req: Request, res: Response) => {
  const result = await categoriesService.getFullCategories()
  return res.json({
    message: CATEGORIES_MESSAGE.GET_SUCCESS,
    data: result
  })
}

export const getCategoryByIdController = async (req: Request<GetCateReqParams>, res: Response) => {
  const {id} = req.params
  const result = await categoriesService.getCategoryById(id)
  if (!result) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: CATEGORIES_MESSAGE.CATEGORY_NOT_FOUND,
      data: null
    })
  }
  return res.json({
    message: CATEGORIES_MESSAGE.GET_SUCCESS,
    data: result
  })
}

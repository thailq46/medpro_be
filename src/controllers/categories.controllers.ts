import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import {
  CreateCateReqBody,
  DeleteCateReqParams,
  GetCateReqParams,
  QueryCategories,
  UpdateCateReqBody,
  UpdateCateReqParams
} from '~/models/request/Category.request'
import categoriesService from '~/services/categories.service'
import {responseMessage} from '~/utils/common'

export const createCategoriesController = async (
  req: Request<ParamsDictionary, any, CreateCateReqBody>,
  res: Response
) => {
  await categoriesService.createCategory(req.body)
  return res.json({
    message: CATEGORIES_MESSAGE.CREATE_SUCCESS
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

export const getFullCategoriesController = async (
  req: Request<ParamsDictionary, any, any, QueryCategories>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {search} = req.query
  const {categories, totalItems} = await categoriesService.getFullCategories({limit, page, search})
  return res.json(
    responseMessage({
      message: CATEGORIES_MESSAGE.GET_SUCCESS,
      data: categories,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
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

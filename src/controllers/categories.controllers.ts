import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {CATEGORIES_MESSAGE} from '~/constants/messages'
import {CreateCateReqBody} from '~/models/request/Category.request'
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

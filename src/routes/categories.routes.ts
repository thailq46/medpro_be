import {Router} from 'express'
import {createCategoriesController, updateCategoriesController} from '~/controllers/categories.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {createCategoriesValidator, updateCategoriesValidator} from '~/middlewares/categories.middlewares'
import {isUserLoggedInValidator} from '~/middlewares/common.middlewares'
import {wrapRequestHandler} from '~/utils/handlers'

const categoriesRouter = Router()

/**
 * Desscription: Create new category
 * Path: /categories/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, slug: string, parent_id: string | null }
 */
categoriesRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  createCategoriesValidator,
  wrapRequestHandler(createCategoriesController)
)

/**
 * Desscription: Create new category
 * Path: /categories/update/:id
 * Method: PUT
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 * Body: { name: string, slug: string, parent_id: string | null }
 */
categoriesRouter.put(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  updateCategoriesValidator,
  wrapRequestHandler(updateCategoriesController)
)

export default categoriesRouter

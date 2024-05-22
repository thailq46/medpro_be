import {Router} from 'express'
import {
  createCategoriesController,
  deleteCategoriesController,
  getCategoryByIdController,
  getFullCategoriesController,
  updateCategoriesController
} from '~/controllers/categories.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {createCategoriesValidator, updateCategoriesValidator} from '~/middlewares/categories.middlewares'
import {isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
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
  verifiedUserValidator,
  createCategoriesValidator,
  wrapRequestHandler(createCategoriesController)
)

/**
 * Desscription: Update new category
 * Path: /categories/update/:id
 * Method: PUT
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 * Body: { name: string, slug: string, parent_id: string | null }
 */
categoriesRouter.put(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  updateCategoriesValidator,
  wrapRequestHandler(updateCategoriesController)
)

/**
 * Desscription: Delete category
 * Path: /categories/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
categoriesRouter.delete(
  '/delete/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  wrapRequestHandler(deleteCategoriesController)
)

/**
 * Desscription: Get categories by id
 * Path: /categories/:id
 * Method: GET
 * Params: { id: string }
 */
categoriesRouter.get('/:id', wrapRequestHandler(getCategoryByIdController))

/**
 * Desscription: Get full list categories
 * Path: /categories
 * Method: GET
 */
categoriesRouter.get('/', paginationValidator, wrapRequestHandler(getFullCategoriesController))

export default categoriesRouter

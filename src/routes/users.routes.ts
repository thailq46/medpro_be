import {Router} from 'express'
import {
  deleteUserByUsernameController,
  getListUsersController,
  getMeController,
  getUserByUsernameController,
  updateMeController,
  updateUserByUsernameController
} from '~/controllers/users.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, paginationValidator} from '~/middlewares/common.middlewares'
import {updateMeValidator, updateUserByUsernameValidator, verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateMeBody, UpdateUserByUsernameBody} from '~/models/request/User.request'
import {wrapRequestHandler} from '~/utils/handlers'

const usersRouter = Router()

/**
 * Desscription: Get information account in use
 * Path: /users/me
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Desscription: Change information account in use
 * Path: /users/me
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { UserSchema }
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeBody>(['avatar', 'username', 'address', 'date_of_birth', 'gender', 'name', 'phone_number']),
  wrapRequestHandler(updateMeController)
)

/**
 * Desscription: Get user by username
 * Path: /users/:username
 * Method: GET
 * Params: { username: string }
 */
usersRouter.get('/:username', wrapRequestHandler(getUserByUsernameController))

/**
 * Desscription: Update user by username
 * Path: /users/:username
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { username: string }
 * Body: { UserSchema }
 */
usersRouter.patch(
  '/:username',
  accessTokenValidator,
  verifiedUserValidator,
  updateUserByUsernameValidator,
  filterMiddleware<UpdateUserByUsernameBody>([
    'address',
    'avatar',
    'date_of_birth',
    'gender',
    'name',
    'phone_number',
    'position',
    'role',
    'username',
    'verify'
  ]),
  wrapRequestHandler(updateUserByUsernameController)
)

/**
 * Desscription: Delete user by username
 * Path: /users/:username
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { username: string }
 */
usersRouter.delete(
  '/:username',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(deleteUserByUsernameController)
)

/**
 * Desscription: Get list users
 * Path: /
 * Method: GET
 * Query: { limit: number, page: number }
 */
usersRouter.get('/', paginationValidator, wrapRequestHandler(getListUsersController))

export default usersRouter

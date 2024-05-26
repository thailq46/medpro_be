import {Router} from 'express'
import {
  createSchedulesController,
  deleteSchedulesController,
  getFullSchedulesController,
  getSchedulesByIdController,
  updateSchedulesController
} from '~/controllers/schedules.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {
  checkParamsScheduleId,
  createSchedulesValidator,
  updateSchedulesValidator
} from '~/middlewares/schedules.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateSchedulesReqBody} from '~/models/request/Schedule.request'
import {wrapRequestHandler} from '~/utils/handlers'

const schedulesRouter = Router()

/**
 * Desscription: Create new schedules
 * Path: /schedules/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SchedulesSchema }
 */
schedulesRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createSchedulesValidator,
  wrapRequestHandler(createSchedulesController)
)

/**
 * Desscription: Update schedules
 * Path: /schedules/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SchedulesSchema }
 * Params: { id: string }
 */
schedulesRouter.patch(
  '/update/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsScheduleId,
  updateSchedulesValidator,
  filterMiddleware<UpdateSchedulesReqBody>(['current_number', 'max_number', 'date', 'time_type', 'doctor_id']),
  wrapRequestHandler(updateSchedulesController)
)

/**
 * Desscription: Delete schedules
 * Path: /schedules/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
schedulesRouter.delete(
  '/delete/:id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsScheduleId,
  wrapRequestHandler(deleteSchedulesController)
)

/**
 * Desscription: Get schedules by id
 * Path: /schedules/:id
 * Method: GET
 * Params: { id: string }
 */
schedulesRouter.get('/:id', checkParamsScheduleId, wrapRequestHandler(getSchedulesByIdController))

/**
 * Desscription: Get schedules
 * Path: /schedules
 * Method: GET
 */
schedulesRouter.get('/', paginationValidator, wrapRequestHandler(getFullSchedulesController))
export default schedulesRouter

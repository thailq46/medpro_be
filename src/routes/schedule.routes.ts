import {Router} from 'express'
import {
  createSchedulesController,
  deleteSchedulesController,
  getFullSchedulesByDoctorIdController,
  getFullSchedulesController,
  getSchedulesByIdController,
  updateSchedulesController
} from '~/controllers/schedules.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {
  checkParamsScheduleDoctorId,
  checkParamsScheduleId,
  createSchedulesValidator,
  updateSchedulesValidator
} from '~/middlewares/schedules.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateSchedulesReqBody} from '~/models/request/Schedule.request'
import {wrapRequestHandler} from '~/utils/handlers'

const schedulesRouter = Router()

/**
 * Description: Create new schedules
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
 * Description: Update schedules
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
  filterMiddleware<UpdateSchedulesReqBody>(['date', 'time_type', 'doctor_id']),
  wrapRequestHandler(updateSchedulesController)
)

/**
 * Description: Delete schedules
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
 * Description: Get full schedules by doctor_id
 * Path: /schedules/doctor/:doctor_id
 * Method: GET
 * Params: { id: string }
 * Query: { limit: number, page: number }
 */
schedulesRouter.get(
  '/doctor/:doctor_id',
  checkParamsScheduleDoctorId,
  paginationValidator,
  wrapRequestHandler(getFullSchedulesByDoctorIdController)
)

/**
 * Description: Get schedules by id
 * Path: /schedules/:id
 * Method: GET
 * Params: { id: string }
 */
schedulesRouter.get('/:id', checkParamsScheduleId, wrapRequestHandler(getSchedulesByIdController))

/**
 * Description: Get schedules
 * Path: /schedules
 * Method: GET
 * Query: { limit: number, page: number, doctor: string, date: string }
 */
schedulesRouter.get('/', paginationValidator, wrapRequestHandler(getFullSchedulesController))
export default schedulesRouter

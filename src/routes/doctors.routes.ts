import {Router} from 'express'
import {
  createDoctorsController,
  deleteDoctorsController,
  getDoctorsByIdController,
  getFullDoctorsByHospitalIdController,
  getFullDoctorsBySpecialtyIdController,
  getFullDoctorsController,
  updateDoctorsController
} from '~/controllers/doctors.controllers'
import {accessTokenValidator} from '~/middlewares/auth.middlewares'
import {filterMiddleware, isUserLoggedInValidator, paginationValidator} from '~/middlewares/common.middlewares'
import {
  checkParamsDoctorByHospitalId,
  checkParamsDoctorsID,
  createDoctorsValidator,
  queryValidator,
  updateDoctorsValidator
} from '~/middlewares/doctors.middlewares'
import {verifiedUserValidator} from '~/middlewares/users.middlewares'
import {UpdateDoctorsReqBody} from '~/models/request/Doctor.request'
import {wrapRequestHandler} from '~/utils/handlers'

const doctorsRouter = Router()

/**
 * Description: Create information doctors
 * Path: /doctors/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 */
doctorsRouter.post(
  '/create',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  createDoctorsValidator,
  wrapRequestHandler(createDoctorsController)
)

/**
 * Description: Update information doctors
 * Path: /doctors/update/:doctor_id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 * Params: { doctor_id: string }
 */
doctorsRouter.patch(
  '/update/:doctor_id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsDoctorsID,
  updateDoctorsValidator,
  filterMiddleware<UpdateDoctorsReqBody>(['description', 'session', 'price', 'therapy', 'specialty_id', 'hospital_id']),
  wrapRequestHandler(updateDoctorsController)
)

/**
 * Description: Delete doctors
 * Path: /doctors/delete/:doctor_id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { doctor_id: string }
 */
doctorsRouter.delete(
  '/delete/:doctor_id',
  isUserLoggedInValidator(accessTokenValidator),
  verifiedUserValidator,
  checkParamsDoctorsID,
  wrapRequestHandler(deleteDoctorsController)
)

/**
 * Description: Get full doctors by specialty_id and hospital_id
 * Path: /doctors/specialty
 * Method: GET
 * Query: { hospital_id: string, specialty_id: string }
 */
doctorsRouter.get('/specialty', queryValidator, wrapRequestHandler(getFullDoctorsBySpecialtyIdController))

/**
 * Description: Get full doctors by hospital_id
 * Path: /doctors/hospital_id/:hospital_id
 * Method: GET
 * Params: { hospital_id: string }
 */
doctorsRouter.get(
  '/hospital/:hospital_id',
  checkParamsDoctorByHospitalId,
  wrapRequestHandler(getFullDoctorsByHospitalIdController)
)

/**
 * Description: Get doctors by id
 * Path: /doctors/:doctor_id
 * Method: GET
 * Params: { doctor_id: string }
 */
doctorsRouter.get('/:doctor_id', checkParamsDoctorsID, wrapRequestHandler(getDoctorsByIdController))

/**
 * Description: Get doctors
 * Path: /doctors
 * Method: GET
 * Query: { limit: number, page: number }
 */
doctorsRouter.get('/', paginationValidator, wrapRequestHandler(getFullDoctorsController))

export default doctorsRouter

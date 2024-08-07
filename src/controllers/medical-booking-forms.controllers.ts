import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {ObjectId} from 'mongodb'
import HTTP_STATUS from '~/constants/httpStatus'
import {MEDICAL_BOOKING_FORMS_MESSAGE} from '~/constants/messages'
import {Pagination} from '~/models/request/Common.request'
import {
  CreateMedicalBookingFormsReqBody,
  GetMedicalBookingFormsParams,
  QueryMedicalBookingForms,
  UpdateMedicalBookingFormsReqBody
} from '~/models/request/MedicalBookingForms.request'
import databaseService from '~/services/database.service'
import medicalBookingFormsService from '~/services/medical-booking-forms.service'
import {responseMessage} from '~/utils/common'

export const createMedicalBookingFormsController = async (
  req: Request<ParamsDictionary, any, CreateMedicalBookingFormsReqBody>,
  res: Response
) => {
  const result = await medicalBookingFormsService.createMedicalBookingForms(req.body)
  return res.json({
    message: MEDICAL_BOOKING_FORMS_MESSAGE.CREATE_SUCCESS
  })
}

export const updateMedicalBookingFormsController = async (
  req: Request<GetMedicalBookingFormsParams, any, UpdateMedicalBookingFormsReqBody>,
  res: Response
) => {
  const {id} = req.params
  const isExist = await databaseService.medicalBookingForms.findOne({_id: new ObjectId(id)})
  if (!isExist) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND
    })
  }
  const result = await medicalBookingFormsService.updateMedicalBookingForms(id, req.body)
  return res.json({
    message: MEDICAL_BOOKING_FORMS_MESSAGE.UPDATE_SUCCESS,
    data: result
  })
}

export const deleteMedicalBookingFormsController = async (
  req: Request<GetMedicalBookingFormsParams>,
  res: Response
) => {
  const {id} = req.params
  const result = await medicalBookingFormsService.deleteMedicalBookingForms(id)
  return res.json({
    message: MEDICAL_BOOKING_FORMS_MESSAGE.DELETE_SUCCESS,
    data: result
  })
}

export const getMedicalBookingFormsByIdController = async (
  req: Request<GetMedicalBookingFormsParams>,
  res: Response
) => {
  const {id} = req.params
  const isExist = await databaseService.medicalBookingForms.findOne({_id: new ObjectId(id)})
  if (!isExist) {
    return res.status(HTTP_STATUS.NOT_FOUND).json({
      message: MEDICAL_BOOKING_FORMS_MESSAGE.NOT_FOUND
    })
  }
  const result = await medicalBookingFormsService.getMedicalBookingFormsById(id)

  return res.json({
    message: MEDICAL_BOOKING_FORMS_MESSAGE.GET_SUCCESS,
    data: result
  })
}

export const getFullMedicalBookingFormsController = async (
  req: Request<ParamsDictionary, any, any, QueryMedicalBookingForms>,
  res: Response
) => {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const {search} = req.query
  const {medicalBookingForms, totalItems} = await medicalBookingFormsService.getFullMedicalBookingForms({
    limit,
    page,
    search
  })
  return res.json(
    responseMessage({
      message: MEDICAL_BOOKING_FORMS_MESSAGE.GET_SUCCESS,
      data: medicalBookingForms,
      meta: {
        total_page: Math.ceil(totalItems / limit),
        limit,
        current_page: page,
        total_items: totalItems
      }
    })
  )
}

import {Request, Response} from 'express'
import {ParamsDictionary} from 'express-serve-static-core'
import {CreateMedicalBookingFormsReqBody} from '~/models/request/MedicalBookingForms.request'
import medicalBookingFormsService from '~/services/medical-booking-forms.service'

export const createMedicalBookingFormsController = async (
  req: Request<ParamsDictionary, any, CreateMedicalBookingFormsReqBody>,
  res: Response
) => {
  const result = await medicalBookingFormsService.createMedicalBookingForms(req.body)
  return res.json({
    message: 'Create medical booking forms successfully',
    data: result
  })
}

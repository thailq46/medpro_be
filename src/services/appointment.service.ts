import {ObjectId} from 'mongodb'
import {CreateAppointmentsReqBody} from '~/models/request/Appointment.request'
import Appointment from '~/models/schemas/Appointment.schema'
import databaseService from '~/services/database.service'

class AppointmentService {
  async createAppointment(payload: CreateAppointmentsReqBody) {
    return await databaseService.appointments.insertOne(
      new Appointment({
        ...payload,
        doctor_id: new ObjectId(payload.doctor_id),
        patient_id: new ObjectId(payload.patient_id),
        service_id: new ObjectId(payload.service_id)
      })
    )
  }
}
const appointmentService = new AppointmentService()
export default appointmentService

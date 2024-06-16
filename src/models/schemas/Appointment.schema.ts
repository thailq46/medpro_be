import {ObjectId} from 'mongodb'

interface AppointmentType {
  _id?: ObjectId
  doctor_id: ObjectId
  patient_id: ObjectId
  service_id: ObjectId
  order_id: string | null
  fullname: string
  email: string
  phone_number: string
  date_of_birth: string
  address: string
  reason: string
  price: number
  gender: number
  date: string
  time: string
  status: boolean
  isPayment: boolean
  created_at?: Date
  updated_at?: Date
}

export default class Appointment {
  _id?: ObjectId
  doctor_id: ObjectId
  patient_id: ObjectId
  service_id: ObjectId
  order_id: string | null
  fullname: string
  email: string
  phone_number: string
  date_of_birth: string
  address: string
  reason: string
  price: number
  gender: number
  date: string
  time: string
  status: boolean
  isPayment: boolean
  created_at: Date
  updated_at: Date
  constructor(appointment: AppointmentType) {
    const date = new Date()
    this._id = appointment._id || new ObjectId()
    this.doctor_id = appointment.doctor_id
    this.patient_id = appointment.patient_id
    this.service_id = appointment.service_id
    this.order_id = appointment.order_id || null
    this.fullname = appointment.fullname
    this.email = appointment.email
    this.phone_number = appointment.phone_number
    this.date_of_birth = appointment.date_of_birth
    this.address = appointment.address
    this.reason = appointment.reason
    this.price = appointment.price
    this.gender = appointment.gender
    this.date = appointment.date
    this.time = appointment.time
    this.status = appointment.status
    this.isPayment = appointment.isPayment
    this.created_at = appointment.created_at || date
    this.updated_at = appointment.updated_at || date
  }
}

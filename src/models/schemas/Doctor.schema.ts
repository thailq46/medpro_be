import {ObjectId} from 'mongodb'

interface DoctorsType {
  _id?: ObjectId
  doctor_id: ObjectId
  specialty_id: ObjectId
  hospital_id: ObjectId
  description: string
  therapy: string // Chuyên trị
  price: number
  session: string // Lịch làm việc
  created_at?: Date
  updated_at?: Date
}

export default class Doctor {
  _id?: ObjectId
  doctor_id: ObjectId
  specialty_id: ObjectId
  hospital_id: ObjectId
  description: string
  therapy: string
  price: number
  session: string
  created_at: Date
  updated_at: Date
  constructor(doctor: DoctorsType) {
    const date = new Date()
    this._id = doctor._id || new ObjectId()
    this.doctor_id = doctor.doctor_id
    this.specialty_id = doctor.specialty_id
    this.hospital_id = doctor.hospital_id
    this.description = doctor.description
    this.therapy = doctor.therapy
    this.price = doctor.price
    this.session = doctor.session
    this.created_at = doctor.created_at || date
    this.updated_at = doctor.updated_at || date
  }
}

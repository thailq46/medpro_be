import {ObjectId} from 'mongodb'

interface SchedulesType {
  _id?: ObjectId
  doctor_id: ObjectId
  current_number?: number // số bệnh nhân hiện tại
  max_number: number // số bệnh nhân nhận max
  date: string // ngày khám bệnh
  time_type: string[] //TimeScheduleType[]
  created_at?: Date
  updated_at?: Date
}

export default class Schedule {
  _id?: ObjectId
  doctor_id: ObjectId
  current_number?: number // số bệnh nhân hiện tại
  max_number: number // số bệnh nhân nhận max
  date: string // ngày khám bệnh
  time_type: string[] //TimeScheduleType[]
  created_at: Date
  updated_at: Date
  constructor({date, doctor_id, max_number, time_type, _id, created_at, current_number, updated_at}: SchedulesType) {
    const initDate = new Date()
    this._id = _id || new ObjectId()
    this.doctor_id = doctor_id
    this.current_number = current_number || 0
    this.max_number = max_number
    this.date = date
    this.time_type = time_type
    this.created_at = created_at || initDate
    this.updated_at = updated_at || initDate
  }
}

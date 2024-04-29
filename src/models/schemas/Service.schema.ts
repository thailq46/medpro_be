import {ObjectId} from 'mongodb'

interface ServicesType {
  _id?: ObjectId
  hospital_id: ObjectId
  specialty_id: ObjectId | null
  name: string
  description: string
  note: string | null
  price: number
  session: string
  created_at?: Date
  updated_at?: Date
}

export default class Service {
  _id?: ObjectId
  name: string
  hospital_id: ObjectId
  specialty_id: ObjectId | null
  description: string
  note: string | null
  price: number
  session: string
  created_at: Date
  updated_at: Date
  constructor({
    name,
    description,
    session,
    price,
    hospital_id,
    specialty_id,
    note,
    _id,
    created_at,
    updated_at
  }: ServicesType) {
    const date = new Date()
    this._id = _id || new ObjectId()
    this.name = name
    this.description = description
    this.price = price
    this.hospital_id = hospital_id
    this.specialty_id = specialty_id || null
    this.note = note || null
    this.session = session
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}

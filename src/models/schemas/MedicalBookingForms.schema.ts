import {ObjectId} from 'mongodb'

export interface MedicalBookingFormsType {
  _id?: ObjectId
  name: string
  slug: string
  image?: string | null
  created_at?: Date
  updated_at?: Date
}

export default class MedicalBookingForms {
  _id?: ObjectId
  name: string
  slug: string
  image: string | null
  created_at: Date
  updated_at: Date
  constructor({_id, name, image, created_at, updated_at, slug}: MedicalBookingFormsType) {
    const date = new Date()
    this._id = _id || new ObjectId()
    this.name = name
    this.slug = slug
    this.image = image || null
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}

import {ObjectId} from 'mongodb'

interface SpecialtiesType {
  _id?: ObjectId
  hostipal_id: ObjectId
  name: string
  slug: string
  description: string
  created_at?: Date
  updated_at?: Date
}

export default class Specialty {
  _id?: ObjectId
  hostipal_id: ObjectId
  name: string
  slug: string
  description: string
  created_at: Date
  updated_at: Date
  constructor({name, description, hostipal_id, slug, _id, created_at, updated_at}: SpecialtiesType) {
    const date = new Date()
    this._id = _id || new ObjectId()
    this.name = name
    this.description = description
    this.hostipal_id = hostipal_id
    this.slug = slug
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}

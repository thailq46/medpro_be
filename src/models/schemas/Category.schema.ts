import {ObjectId} from 'mongodb'

interface CategoriesType {
  _id?: ObjectId
  name: string
  slug: string
  parent_id: ObjectId | null
  created_at?: Date
  updated_at?: Date
}

export default class Category {
  _id?: ObjectId
  name: string
  slug: string
  parent_id: ObjectId | null
  created_at: Date
  updated_at: Date
  constructor({name, slug, parent_id, _id, created_at, updated_at}: CategoriesType) {
    const date = new Date()
    this._id = _id || new ObjectId()
    this.name = name
    this.slug = slug
    this.parent_id = parent_id || null
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}

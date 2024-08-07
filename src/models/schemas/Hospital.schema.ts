import {ObjectId} from 'mongodb'

interface HospitalsType {
  _id?: ObjectId
  categoryId: ObjectId
  name: string
  slug: string
  description: string
  session?: string // Thời gian làm việc : Thứ 2 -> Thứ 6
  start_time?: string | null // "08:00"
  end_time?: string | null // "17:30"
  hotline?: string
  address: string
  avatar?: string | null
  banner?: string | null
  images?: string[] | null
  booking_forms: ObjectId[]
  description_detail?: string | null
  types: number[]
  created_at?: Date
  updated_at?: Date
}

export default class Hospital {
  _id?: ObjectId
  categoryId: ObjectId
  name: string
  slug: string
  description: string
  session: string // Thời gian làm việc : Thứ 2 -> Thứ 6
  start_time: string | null // "08:00"
  end_time: string | null // "17:30"
  hotline: string
  address: string
  avatar: string | null
  banner: string | null
  images: string[] | null
  booking_forms: ObjectId[]
  types: number[]
  description_detail: string | null
  created_at: Date
  updated_at: Date
  constructor({
    address,
    categoryId,
    name,
    types,
    _id,
    avatar,
    banner,
    description,
    created_at,
    end_time,
    hotline,
    images,
    session,
    slug,
    booking_forms,
    start_time,
    description_detail,
    updated_at
  }: HospitalsType) {
    const date = new Date()
    this._id = _id || new ObjectId()
    this.categoryId = categoryId
    this.name = name
    this.slug = slug
    this.description = description
    this.session = session || ''
    this.start_time = start_time || ''
    this.end_time = end_time || ''
    this.hotline = hotline || ''
    this.address = address
    this.avatar = avatar || null
    this.banner = banner || null
    this.images = images || null
    this.types = types
    this.booking_forms = booking_forms
    this.description_detail = description_detail || null
    this.created_at = created_at || date
    this.updated_at = updated_at || date
  }
}

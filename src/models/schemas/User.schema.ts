import {ObjectId} from 'mongodb'
import {GenderType, PositionType, RoleType, UserVerifyStatus} from '~/constants/types'

interface UserType {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  gender: GenderType
  password: string
  created_at?: Date
  updated_at?: Date
  forgot_password_token?: string
  email_verify_token?: string
  verify?: UserVerifyStatus
  address?: string
  username?: string
  avatar?: string
  role?: RoleType
  phone_number?: string
  position?: PositionType
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  gender: GenderType
  password: string
  created_at: Date
  updated_at: Date
  forgot_password_token: string
  email_verify_token: string
  verify: UserVerifyStatus
  address: string
  username: string
  avatar: string
  role: RoleType
  phone_number: string
  position: PositionType
  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name
    this.email = user.email
    this.date_of_birth = user.date_of_birth || new Date()
    this.gender = user.gender
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.forgot_password_token = user.forgot_password_token || ''
    this.email_verify_token = user.email_verify_token || ''
    this.address = user.address || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.role = user.role || RoleType.Patient
    this.phone_number = user.phone_number || ''
    this.position = user.position || PositionType.None
    this.verify = user.verify || UserVerifyStatus.Unverified
  }
}

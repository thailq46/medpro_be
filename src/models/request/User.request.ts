import {ParamsDictionary, Query} from 'express-serve-static-core'
import {Pagination} from '~/models/request/Common.request'
export interface RegisterReqBody {
  name: string
  password: string
  confirm_password: string
  email: string
  date_of_birth: string
  gender: number
}
export interface LoginReqBody {
  email: string
  password: string
}
export interface LogoutReqBody {
  refresh_token: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}
export interface EmailVerifyReqBody {
  email_verify_token: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}
export interface UpdateMeBody {
  name?: string
  date_of_birth?: string
  gender?: number
  address?: string
  avatar?: string
  phone_number?: string
  username?: string
}
export interface GetUserByUsernameReqParams extends ParamsDictionary {
  username: string
}

export interface UpdateUserByUsernameBody {
  name?: string
  date_of_birth?: string
  gender?: number
  address?: string
  avatar?: string
  phone_number?: string
  username?: string
  position?: number
  verify?: number
  role?: number
}
export interface ChangePasswordReqBody {
  old_password: string
  new_password: string
  confirm_password: string
}

export interface QueryUsers extends Pagination, Query {
  search?: string
  role?: string
}

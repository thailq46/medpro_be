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
  position?: number
  username?: string
}

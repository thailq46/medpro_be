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

import 'express'
import {TokenPayload} from '~/models/request/User.requests'
import User from '~/models/schemas/User.schema'

declare module 'express' {
  interface Request {
    user?: User
    decode_authorization?: TokenPayload
    decode_refresh_token?: TokenPayload
    decoded_forgot_password_token?: TokenPayload
    decoded_email_verify_token?: TokenPayload
  }
}

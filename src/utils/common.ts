import {NextFunction, Request} from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import {JsonWebTokenError} from 'jsonwebtoken'
import {envConfig} from '~/constants/config'
import {verifyToken} from '~/utils/jwt'
import {capitalize, pick} from 'lodash'
import {CHECK_DATE_REGEX} from '~/constants/regax'

interface IMetaData {
  total_page?: number
  limit?: number
  current_page?: number
  total_items?: number
}

export const responseMessage = ({message, data, meta = {}}: {message: string; data?: any; meta?: IMetaData}) => {
  return {
    message,
    data,
    meta
  }
}

export const numberEnumToArray = (numberEnum: {[key: string]: string | number}) => {
  return Object.values(numberEnum).filter((value) => typeof value === 'number') as number[]
}

export function isValidDateFormat(date: string) {
  // Biểu thức chính quy để kiểm tra định dạng ngày DD/MM/YYYY
  const regex = CHECK_DATE_REGEX
  return regex.test(date)
}
export async function verifyAccessToken(access_token: string, req?: Request) {
  if (!access_token) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: USERS_MESSAGE.ACCESS_TOKEN_REQUIRED
    })
  }
  try {
    const decoded_authorization = await verifyToken({
      token: access_token,
      secretOrPrivateKey: envConfig.jwtSecretAccessToken
    })
    if (req) {
      ;(req as Request).decode_authorization = decoded_authorization
      return true
    }
    return decoded_authorization
  } catch (error) {
    throw new ErrorWithStatus({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: capitalize((error as JsonWebTokenError).message)
    })
  }
}

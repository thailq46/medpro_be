import jwt from 'jsonwebtoken'
import {envConfig} from '~/constants/config'

export interface TokenPayload extends jwt.JwtPayload {
  user_id: string
  token_type: string
  verify: string
  exp: number
  iat: number
}

export const signToken = ({
  payload,
  secretOrPrivateKey = envConfig.secretOrPrivateKey,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | Buffer | object
  secretOrPrivateKey?: string
  options?: jwt.SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({
  token,
  secretOrPrivateKey = envConfig.secretOrPrivateKey
}: {
  token: string
  secretOrPrivateKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
      if (err) {
        return reject(err)
      }
      // console.log('jwt.verify ~ decoded', decoded)
      resolve(decoded as TokenPayload)
    })
  })
}

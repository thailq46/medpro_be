import jwt from 'jsonwebtoken'
import {envConfig} from '~/constants/config'

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

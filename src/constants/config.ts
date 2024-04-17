import {config} from 'dotenv'

config()

export const envConfig = {
  port: (process.env.PORT as string) || 4000,

  dbName: process.env.DB_NAME as string,
  dbUsername: process.env.DB_USERNAME as string,
  dbPassword: process.env.DB_PASSWORD as string,

  dbUsersCollection: process.env.DB_USERS_COLLECTION as string,

  secretOrPrivateKey: process.env.SECRET_OR_PRIVATE_KEY as string,
  jtwAccessToken: process.env.JWT_ACCESS_TOKEN as string,
  jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
  jwtRefreshToken: process.env.JWT_REFRESH_TOKEN as string,
  jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string
}

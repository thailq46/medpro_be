import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import {envConfig} from './constants/config'
import {defaultErrorHandler} from './middlewares/error.middlewares'
import router from './routes/app.routes'
import databaseService from './services/database.service'
// import './utils/fake'
import {createServer} from 'http'
import {ObjectId} from 'mongodb'
import {Server} from 'socket.io'
import {UserVerifyStatus} from '~/constants/enum'
import HTTP_STATUS from '~/constants/httpStatus'
import {USERS_MESSAGE} from '~/constants/messages'
import {ErrorWithStatus} from '~/models/Errors'
import Conversation from '~/models/schemas/Conversation.schema'
import {verifyAccessToken} from '~/utils/common'
import {TokenPayload} from '~/utils/jwt'
import {initFolder} from './utils/file'

const app = express()
const port = envConfig.port

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {origin: 'http://localhost:3000'}
})

const corsOptions: cors.CorsOptions = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

const limiter = rateLimit({
  // windowMs: 15 * 60 * 1000, // 15 minutes
  // max: 100, // limit each IP to 100 requests per windowMs
  // standardHeaders: true,
  // legacyHeaders: false
})
// app.use(limiter)
app.use(
  helmet({
    crossOriginResourcePolicy: {policy: 'cross-origin'}
  })
)
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexCategories()
  databaseService.indexMedicalBookingForms()
  databaseService.indexHospitals()
  databaseService.indexServices()
  databaseService.indexSpecialties()
  databaseService.indexDoctors()
  databaseService.indexSchedules()
  databaseService.indexConversations()
})

initFolder()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.use(defaultErrorHandler)

// initSocket(httpServer)
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
/**
 * Middleware này sẽ được gọi trước khi socket.io nó connection => nên khi có lỗi thì sẽ không listen được ở trong connection vì chưa có socket nào kết nối
 */
io.use(async (socket, next) => {
  const {Authorization} = socket.handshake.auth
  const access_token = Authorization?.split(' ')[1]
  try {
    const decoded_authorization = await verifyAccessToken(access_token)
    const {verify} = decoded_authorization as TokenPayload
    if (verify !== UserVerifyStatus.Verified) {
      // throw 1 error nó sẽ nhảy xuống catch ngay
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_VERIFIED,
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    // Truyền decoded_authorization vào socket để có thể sử dụng ở các middleware khác
    socket.handshake.auth.decoded_authorization = decoded_authorization
    socket.handshake.auth.access_token = access_token
    next()
  } catch (error) {
    next({
      message: 'Unauthorized',
      name: 'UnauthorizedError',
      data: error
    })
  }
})
/**
 * func này sẽ có nhều lần gọi khác nhau
 * VD client 1 kết nối tới server thì sẽ gọi lần đầu tiên và có 1 socket instance của client 1
 * client 2 kết nối tới server thì sẽ gọi lần thứ 2 và có 1 socket instance của client 2
 * ===> socket instance của client 1 và client 2 là khác nhau và không thể truy cập vào socket của client 1 từ client 2 và ngược lại (Ta có 2 cái socket)
 * Socket từ client 1 bắn 1 cái events thì socket client 1 bên server lắng nghe thì mới nhận được chứ socket client 2 bên server lắng nghe events cũng không thể nhận được
 */
io.on('connection', (socket) => {
  const {user_id} = socket.handshake.auth.decoded_authorization as TokenPayload
  console.log(`user ${socket.id} + ${user_id} connected`)
  if (user_id) {
    users[user_id] = {
      socket_id: socket.id
    }

    socket.use(async (_, next) => {
      const {access_token} = socket.handshake.auth
      try {
        await verifyAccessToken(access_token)
        next()
      } catch (error) {
        next(new Error('Unauthorized'))
      }
    })

    socket.on('error', (error) => {
      if (error.message === 'Unauthorized') {
        socket.disconnect()
      }
    })

    socket.on('send_message', async (data) => {
      console.log(data)
      const {receiver_id, sender_id, content} = data.payload
      const receiver_socket_id = users[receiver_id]?.socket_id
      const conversation = new Conversation({
        sender_id: new ObjectId(sender_id),
        receiver_id: new ObjectId(receiver_id),
        content
      })
      const result = await databaseService.conversations.insertOne(conversation)
      conversation._id = result.insertedId
      if (receiver_socket_id) {
        socket.to(receiver_socket_id).emit('receive_message', {
          payload: conversation
        })
      }
    })
    console.log(users)
  }

  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`user ${socket.id} disconnected`)
    console.log(users)
  })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

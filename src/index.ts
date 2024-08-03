import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import {envConfig} from './constants/config'
import {defaultErrorHandler} from './middlewares/error.middlewares'
import router from './routes/app.routes'
import databaseService from './services/database.service'
// import './utils/fake'
import {createServer} from 'http'
import {initSocket} from '~/utils/socket'
import {initFolder} from './utils/file'

const app = express()
const port = envConfig.port

const httpServer = createServer(app)

const corsOptions: cors.CorsOptions = {
  origin: ['https://lequangthai-medpro.io.vn', /\.lequangthai-medpro\.io.vn$/, 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   standardHeaders: true,
//   legacyHeaders: false
// })
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

initSocket(httpServer)

// logger.info('Hello created log files', {foo: 'bar'})
// logger.log('info', 'Hello created log files', {foo: 'bar'})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

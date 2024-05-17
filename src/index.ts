import express from 'express'
import {config} from 'dotenv'
import {envConfig} from '~/constants/config'
import databaseService from '~/services/database.service'
import router from '~/routes/app.routes'
import {defaultErrorHandler} from '~/middlewares/error.middlewares'
import {initFolder} from '~/utils/file'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '~/firebase/firebase.config'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'

config()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
})

initializeApp(firebaseConfig)

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
})

const app = express()
const port = envConfig.port

app.use(limiter)
app.use(helmet())
const corsOptions: cors.CorsOptions = {
  origin: envConfig.clientUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

initFolder()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

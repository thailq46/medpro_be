import express from 'express'
import {envConfig, isProduction} from '~/constants/config'
import databaseService from '~/services/database.service'
import router from '~/routes/app.routes'
import {defaultErrorHandler} from '~/middlewares/error.middlewares'
import {initFolder} from '~/utils/file'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import cors from 'cors'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false
})

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
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
  // allowedHeaders: ['Content-Type', 'Authorization']
}
app.options('', cors(corsOptions))
app.use(cors(corsOptions))

initFolder()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

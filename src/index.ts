import express from 'express'
import {config} from 'dotenv'
import {envConfig} from '~/constants/config'
import databaseService from '~/services/database.service'
import router from '~/routes/app.routes'
import {defaultErrorHandler} from '~/middlewares/error.middlewares'
import {initFolder} from '~/utils/file'
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '~/firebase/firebase.config'
config()

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

initFolder()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

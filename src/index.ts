import express from 'express'
import {config} from 'dotenv'
import {envConfig} from '~/constants/config'
import databaseService from '~/services/database.service'
import router from '~/routes/app.routes'
import {defaultErrorHandler} from '~/middlewares/error.middlewares'
config()

const app = express()
const port = envConfig.port

databaseService.connect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

router(app)

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

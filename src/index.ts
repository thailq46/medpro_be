import express from 'express'
import {config} from 'dotenv'
import {envConfig} from '~/constants/config'
import databaseService from '~/services/database.service'
config()

const app = express()
const port = envConfig.port

databaseService.connect()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

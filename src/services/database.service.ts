import {Collection, Db, MongoClient} from 'mongodb'
import {envConfig} from '~/constants/config'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@medprobe.kctpk6e.mongodb.net/?retryWrites=true&w=majority&appName=MedproBE`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(envConfig.dbName)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ping: 1})
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Failed to connect to MongoDB', error)
    }
  }
  async closeConnection() {
    await this.client.close()
    console.log('Closed MongoDB connection!')
  }
  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService

import {Collection, Db, MongoClient} from 'mongodb'
import {envConfig} from '~/constants/config'
import Category from '~/models/schemas/Category.schema'
import Doctor from '~/models/schemas/Doctor.schema'
import Hospital from '~/models/schemas/Hospital.schema'
import MedicalBookingForms from '~/models/schemas/MedicalBookingForms.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Schedule from '~/models/schemas/Schedule.schema'
import Service from '~/models/schemas/Service.schema'
import Specialty from '~/models/schemas/Specialty.schema'
import User from '~/models/schemas/User.schema'

// const dbUsername = encodeURIComponent(envConfig.dbUsername)
// const dbPassword = encodeURIComponent(envConfig.dbPassword)

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

  async indexUsers() {
    const isExist = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!isExist) {
      this.users.createIndex({email: 1, password: 1})
      this.users.createIndex({email: 1}, {unique: true})
      this.users.createIndex({username: 1}, {unique: true})
    }
  }
  // Mongodb có 1 background task là một tác vụ chạy ngầm, nó sẽ chạy khoảng 60s 1 lần (sau 1 phút nó sẽ chạy 1 lần) để kiểm tra xem thử còn thời gian sống (TTL - time to live ) hay không, nếu hết thời gian sống thì nó sẽ xóa dữ liệu đó đi
  async indexRefreshTokens() {
    const isExist = await this.refreshTokens.indexExists(['token_1', 'exp_1'])
    if (!isExist) {
      this.refreshTokens.createIndex({token: 1})
      this.refreshTokens.createIndex({exp: 1}, {expireAfterSeconds: 0})
    }
  }
  async indexCategories() {
    const isExist = await this.categories.indexExists(['slug_1', 'parent_id_1'])
    if (!isExist) {
      this.categories.createIndex({slug: 1}, {unique: true})
      this.categories.createIndex({parent_id: 1})
    }
  }
  async indexMedicalBookingForms() {
    const isExist = await this.medicalBookingForms.indexExists(['name_1'])
    if (!isExist) {
      this.medicalBookingForms.createIndex({name: 1}, {unique: true})
    }
  }
  async indexHospitals() {
    const isExist = await this.hospitals.indexExists(['slug_1', 'name_1'])
    if (!isExist) {
      this.hospitals.createIndex({slug: 1}, {unique: true})
      this.hospitals.createIndex({name: 1}, {unique: true})
    }
  }
  // async indexServices() {}

  // async indexSpecialties() {}

  // async indexSchedules() {}

  async indexDoctors() {
    const isExist = await this.doctors.indexExists(['doctor_id_1'])
    if (!isExist) {
      this.doctors.createIndex({doctor_id: 1}, {unique: true})
    }
  }
  get users(): Collection<User> {
    return this.db.collection(envConfig.dbUsersCollection)
  }
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(envConfig.dbRefreshTokensCollection)
  }
  get categories(): Collection<Category> {
    return this.db.collection(envConfig.dbCategoriesCollection)
  }
  get medicalBookingForms(): Collection<MedicalBookingForms> {
    return this.db.collection(envConfig.dbMedicalBookingFormsCollection)
  }
  get hospitals(): Collection<Hospital> {
    return this.db.collection(envConfig.dbHospitalsCollection)
  }
  get services(): Collection<Service> {
    return this.db.collection(envConfig.dbServicesCollection)
  }
  get specialties(): Collection<Specialty> {
    return this.db.collection(envConfig.dbSpecialtiesCollection)
  }
  get doctors(): Collection<Doctor> {
    return this.db.collection(envConfig.dbDoctorsCollection)
  }
  get schedules(): Collection<Schedule> {
    return this.db.collection(envConfig.dbSchedulesCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService

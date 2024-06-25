import {Collection, Db, MongoClient} from 'mongodb'
import {envConfig} from '~/constants/config'
import Appointment from '~/models/schemas/Appointment.schema'
import Category from '~/models/schemas/Category.schema'
import Conversation from '~/models/schemas/Conversation.schema'
import Doctor from '~/models/schemas/Doctor.schema'
import Hospital from '~/models/schemas/Hospital.schema'
import MedicalBookingForms from '~/models/schemas/MedicalBookingForms.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Schedule from '~/models/schemas/Schedule.schema'
import Service from '~/models/schemas/Service.schema'
import Specialty from '~/models/schemas/Specialty.schema'
import User from '~/models/schemas/User.schema'

const dbUsername = encodeURIComponent(envConfig.dbUsername)
const dbPassword = encodeURIComponent(envConfig.dbPassword)

const uri = `mongodb+srv://${dbUsername}:${dbPassword}@medprobe.kctpk6e.mongodb.net/?retryWrites=true&w=majority&appName=MedproBE`

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
    const isExist = await this.users.indexExists([
      'email_1_password_1',
      'email_1',
      'username_1',
      'email_text_name_text_username_text',
      'role_1'
    ])
    if (!isExist) {
      this.users.createIndex({email: 1, password: 1})
      this.users.createIndex({email: 1}, {unique: true})
      this.users.createIndex({username: 1}, {unique: true})
      this.users.createIndex({email: 'text', name: 'text', username: 'text'})
      this.users.createIndex({role: 1})
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
    const isExist = await this.categories.indexExists(['slug_1', 'parent_id_1', 'name_text'])
    if (!isExist) {
      this.categories.createIndex({slug: 1}, {unique: true})
      this.categories.createIndex({parent_id: 1})
      this.categories.createIndex({name: 'text'})
    }
  }
  async indexMedicalBookingForms() {
    const isExist = await this.medicalBookingForms.indexExists(['name_1', 'name_text'])
    if (!isExist) {
      this.medicalBookingForms.createIndex({name: 1}, {unique: true})
      this.medicalBookingForms.createIndex({name: 'text'})
    }
  }
  async indexHospitals() {
    const isExist = await this.hospitals.indexExists(['slug_1', 'name_1', 'name_text'])
    if (!isExist) {
      this.hospitals.createIndex({slug: 1}, {unique: true})
      this.hospitals.createIndex({name: 1}, {unique: true})
      this.hospitals.createIndex({name: 'text'})
    }
  }
  async indexServices() {
    const isExist = await this.services.indexExists(['name_text', 'hospital_id_1', 'specialty_id_1'])
    if (!isExist) {
      this.services.createIndex({name: 'text'})
      this.services.createIndex({hospital_id: 1})
      this.services.createIndex({specialty_id: 1})
    }
  }

  async indexSpecialties() {
    const isExist = await this.specialties.indexExists(['name_text', 'hospital_id_1'])
    if (!isExist) {
      this.specialties.createIndex({name: 'text'})
      this.specialties.createIndex({hospital_id: 1})
    }
  }

  async indexSchedules() {
    const isExist = await this.schedules.indexExists(['doctor_id_1', 'date_1', 'doctor_id_1_date_1'])
    if (!isExist) {
      this.schedules.createIndex({doctor_id: 1})
      this.schedules.createIndex({date: 1})
      this.schedules.createIndex({doctor_id: 1, date: 1})
    }
  }

  async indexDoctors() {
    const isExist = await this.doctors.indexExists([
      'doctor_id_1',
      'hospital_id_1',
      'specialty_id_1',
      'hospital_id_1_specialty_id_1',
      'name_text'
    ])
    if (!isExist) {
      this.doctors.createIndex({doctor_id: 1}, {unique: true})
      this.doctors.createIndex({hospital_id: 1})
      this.doctors.createIndex({specialty_id: 1})
      this.doctors.createIndex({hospital_id: 1, specialty_id: 1})
      this.doctors.createIndex({name: 'text'})
    }
  }

  async indexConversations() {
    const isExist = await this.conversations.indexExists(['created_at_-1'])
    if (!isExist) {
      this.appointments.createIndex({created_at: -1})
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
  get appointments(): Collection<Appointment> {
    return this.db.collection(envConfig.dbAppointmentsCollection)
  }
  get conversations(): Collection<Conversation> {
    return this.db.collection(envConfig.dbConversationsCollection)
  }
}

const databaseService = new DatabaseService()
export default databaseService

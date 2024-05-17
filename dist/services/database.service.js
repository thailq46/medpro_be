"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("../constants/config");
const dbUsername = encodeURIComponent(config_1.envConfig.dbUsername);
const dbPassword = encodeURIComponent(config_1.envConfig.dbPassword);
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@medprobe.kctpk6e.mongodb.net/?retryWrites=true&w=majority&appName=MedproBE`;
class DatabaseService {
    client;
    db;
    constructor() {
        this.client = new mongodb_1.MongoClient(uri);
        this.db = this.client.db(config_1.envConfig.dbName);
    }
    async connect() {
        try {
            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 });
            console.log('Pinged your deployment. You successfully connected to MongoDB!');
        }
        catch (error) {
            console.log('Failed to connect to MongoDB', error);
        }
    }
    async closeConnection() {
        await this.client.close();
        console.log('Closed MongoDB connection!');
    }
    get users() {
        return this.db.collection(config_1.envConfig.dbUsersCollection);
    }
    get refreshTokens() {
        return this.db.collection(config_1.envConfig.dbRefreshTokensCollection);
    }
    get categories() {
        return this.db.collection(config_1.envConfig.dbCategoriesCollection);
    }
    get medicalBookingForms() {
        return this.db.collection(config_1.envConfig.dbMedicalBookingFormsCollection);
    }
    get hospitals() {
        return this.db.collection(config_1.envConfig.dbHospitalsCollection);
    }
    get services() {
        return this.db.collection(config_1.envConfig.dbServicesCollection);
    }
    get specialties() {
        return this.db.collection(config_1.envConfig.dbSpecialtiesCollection);
    }
    get doctors() {
        return this.db.collection(config_1.envConfig.dbDoctorsCollection);
    }
    get schedules() {
        return this.db.collection(config_1.envConfig.dbSchedulesCollection);
    }
    async indexUsers() {
        const isExist = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1']);
        if (!isExist) {
            this.users.createIndex({ email: 1, password: 1 });
            this.users.createIndex({ email: 1 }, { unique: true });
            this.users.createIndex({ username: 1 }, { unique: true });
        }
    }
    // Mongodb có 1 background task là một tác vụ chạy ngầm, nó sẽ chạy khoảng 60s 1 lần (sau 1 phút nó sẽ chạy 1 lần) để kiểm tra xem thử còn thời gian sống (TTL - time to live ) hay không, nếu hết thời gian sống thì nó sẽ xóa dữ liệu đó đi
    async indexRefreshTokens() {
        const isExist = await this.refreshTokens.indexExists(['token_1', 'exp_1']);
        if (!isExist) {
            this.refreshTokens.createIndex({ token: 1 });
            this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 });
        }
    }
    async indexCategories() {
        const isExist = await this.categories.indexExists(['slug_1', 'parent_id_1']);
        if (!isExist) {
            this.categories.createIndex({ slug: 1 }, { unique: true });
            this.categories.createIndex({ parent_id: 1 });
        }
    }
    async indexMedicalBookingForms() {
        const isExist = await this.medicalBookingForms.indexExists(['name_1']);
        if (!isExist) {
            this.medicalBookingForms.createIndex({ name: 1 }, { unique: true });
        }
    }
    async indexHospitals() {
        const isExist = await this.hospitals.indexExists(['slug_1', 'name_1']);
        if (!isExist) {
            this.hospitals.createIndex({ slug: 1 }, { unique: true });
            this.hospitals.createIndex({ name: 1 }, { unique: true });
        }
    }
    async indexServices() { }
    async indexSpecialties() { }
    async indexSchedules() { }
    async indexDoctors() {
        const isExist = await this.doctors.indexExists(['doctor_id_1']);
        if (!isExist) {
            this.doctors.createIndex({ doctor_id: 1 }, { unique: true });
        }
    }
}
const databaseService = new DatabaseService();
exports.default = databaseService;

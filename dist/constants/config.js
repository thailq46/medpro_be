"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = exports.isProduction = void 0;
const dotenv_1 = require("dotenv");
const minimist_1 = __importDefault(require("minimist"));
const options = (0, minimist_1.default)(process.argv.slice(2));
exports.isProduction = options.env === 'production';
(0, dotenv_1.config)({
    path: options.env ? `.env.${options.env}` : '.env'
});
exports.envConfig = {
    port: process.env.PORT || 10000,
    host: process.env.HOST,
    clientUrl: process.env.CLIENT_URL,
    mongoUri: process.env.MONGODB_URI,
    passwordSecret: process.env.PASSWORD_SECRET,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbUsersCollection: process.env.DB_USERS_COLLECTION,
    dbRefreshTokensCollection: process.env.DB_REFRESH_TOKENS_COLLECTION,
    dbCategoriesCollection: process.env.DB_CATEGORIES_COLLECTION,
    dbMedicalBookingFormsCollection: process.env.DB_MEDICAL_BOOKING_FORMS_COLLECTION,
    dbHospitalsCollection: process.env.DB_HOSPITALS_COLLECTION,
    dbServicesCollection: process.env.DB_SERVICES_COLLECTION,
    dbSpecialtiesCollection: process.env.DB_SPECIALTIES_COLLECTION,
    dbDoctorsCollection: process.env.DB_DOCTORS_COLLECTION,
    dbSchedulesCollection: process.env.DB_SCHEDULES_COLLECTION,
    secretOrPrivateKey: process.env.SECRET_OR_PRIVATE_KEY,
    jwtSecretAccessToken: process.env.JWT_ACCESS_TOKEN,
    jwtAccessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    jwtSecretRefreshToken: process.env.JWT_REFRESH_TOKEN,
    jwtRefreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    jwtSecretForgotPasswordToken: process.env.JWT_FORGOT_PASSWORD_TOKEN,
    jwtForgotPasswordTokenExpiresIn: process.env.JWT_FORGOT_PASSWORD_TOKEN_EXPIRES_IN,
    jwtSecretEmailVerifyToken: process.env.JWT_EMAIL_VERIFY_TOKEN,
    jwtEmailVerifyTokenExpiresIn: process.env.JWT_EMAIL_VERIFY_TOKEN_EXPIRES_IN,
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    ggdriver_client_id: process.env.GG_DRIVER_CLIENT_ID,
    ggdriver_client_secret: process.env.GG_DRIVER_CLIENT_SECRET,
    ggdriver_redirec_uri: process.env.GG_DRIVER_REDIRECT_URI,
    ggdriver_refresh_token: process.env.GG_DRIVER_REFRESH_TOKEN,
    ggmail_client_id: process.env.GG_MAIL_CLIENT_ID,
    ggmail_client_secret: process.env.GG_MAIL_CLIENT_SECRET,
    ggmail_refresh_token: process.env.GG_MAIL_REFRESH_TOKEN,
    mail_mailer: process.env.MAIL_MAILER,
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
    mail_username: process.env.MAIL_USERNAME,
    mail_password: process.env.MAIL_PASSWORD,
    mail_encryption: process.env.MAIL_ENCRYPTION,
    mail_from_address: process.env.MAIL_FROM_ADDRESS,
    mail_from_name: process.env.MAIl_FROM_NAME
};

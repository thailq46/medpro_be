"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./constants/config");
const database_service_1 = __importDefault(require("./services/database.service"));
const app_routes_1 = __importDefault(require("./routes/app.routes"));
const error_middlewares_1 = require("./middlewares/error.middlewares");
const file_1 = require("./utils/file");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false
});
database_service_1.default.connect().then(() => {
    database_service_1.default.indexUsers();
    database_service_1.default.indexRefreshTokens();
    database_service_1.default.indexCategories();
    database_service_1.default.indexMedicalBookingForms();
    database_service_1.default.indexHospitals();
    database_service_1.default.indexServices();
    database_service_1.default.indexSpecialties();
    database_service_1.default.indexDoctors();
    database_service_1.default.indexSchedules();
});
const app = (0, express_1.default)();
const port = config_1.envConfig.port;
app.use(limiter);
app.use((0, helmet_1.default)());
const corsOptions = {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.options('', (0, cors_1.default)(corsOptions));
app.use((0, cors_1.default)(corsOptions));
(0, file_1.initFolder)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, app_routes_1.default)(app);
app.use(error_middlewares_1.defaultErrorHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

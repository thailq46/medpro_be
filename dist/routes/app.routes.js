"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const categories_routes_1 = __importDefault(require("../routes/categories.routes"));
const medical_booking_forms_routes_1 = __importDefault(require("../routes/medical-booking-forms.routes"));
const users_routes_1 = __importDefault(require("../routes/users.routes"));
const medias_routes_1 = __importDefault(require("../routes/medias.routes"));
const static_routes_1 = __importDefault(require("../routes/static.routes"));
const hospitals_routes_1 = __importDefault(require("../routes/hospitals.routes"));
const services_routes_1 = __importDefault(require("../routes/services.routes"));
const specialties_routes_1 = __importDefault(require("../routes/specialties.routes"));
const doctors_routes_1 = __importDefault(require("../routes/doctors.routes"));
const schedule_routes_1 = __importDefault(require("../routes/schedule.routes"));
function router(app) {
    app.use('/auth', auth_routes_1.default);
    app.use('/users', users_routes_1.default);
    app.use('/categories', categories_routes_1.default);
    app.use('/medical-booking-forms', medical_booking_forms_routes_1.default);
    app.use('/medias', medias_routes_1.default);
    app.use('/static', static_routes_1.default);
    app.use('/hospitals', hospitals_routes_1.default);
    app.use('/services', services_routes_1.default);
    app.use('/specialties', specialties_routes_1.default);
    app.use('/doctors', doctors_routes_1.default);
    app.use('/schedules', schedule_routes_1.default);
}
exports.default = router;

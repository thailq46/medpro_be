"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctors_controllers_1 = require("../controllers/doctors.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const doctors_middlewares_1 = require("../middlewares/doctors.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const doctorsRouter = (0, express_1.Router)();
/**
 * Desscription: Create information doctors
 * Path: /doctors/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 */
doctorsRouter.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, doctors_middlewares_1.createDoctorsValidator, (0, handlers_1.wrapRequestHandler)(doctors_controllers_1.createDoctorsController));
/**
 * Desscription: Update information doctors
 * Path: /doctors/update/:doctor_id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { DoctorsSchema }
 * Params: { doctor_id: string }
 */
doctorsRouter.patch('/update/:doctor_id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, doctors_middlewares_1.checkParamsDoctorsID, doctors_middlewares_1.updateDoctorsValidator, (0, common_middlewares_1.filterMiddleware)(['description', 'session', 'price', 'therapy', 'specialty_id']), (0, handlers_1.wrapRequestHandler)(doctors_controllers_1.updateDoctorsController));
/**
 * Desscription: Delete doctors
 * Path: /doctors/delete/:doctor_id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { doctor_id: string }
 */
doctorsRouter.delete('/delete/:doctor_id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, doctors_middlewares_1.checkParamsDoctorsID, (0, handlers_1.wrapRequestHandler)(doctors_controllers_1.deleteDoctorsController));
/**
 * Desscription: Get doctors by id
 * Path: /doctors/:doctor_id
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { doctor_id: string }
 */
doctorsRouter.get('/:doctor_id', doctors_middlewares_1.checkParamsDoctorsID, (0, handlers_1.wrapRequestHandler)(doctors_controllers_1.getDoctorsByIdController));
/**
 * Desscription: Get doctors
 * Path: /doctors
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Query: { limit: number, page: number }
 */
doctorsRouter.get('/', common_middlewares_1.paginationValidator, (0, handlers_1.wrapRequestHandler)(doctors_controllers_1.getFullDoctorsController));
exports.default = doctorsRouter;

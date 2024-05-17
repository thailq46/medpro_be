"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medical_booking_forms_controllers_1 = require("../controllers/medical-booking-forms.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const medical_booking_forms_middlewares_1 = require("../middlewares/medical-booking-forms.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const medicalBookingFormsRouter = (0, express_1.Router)();
/**
 * Desscription: Create new medical booking forms
 * Path: /medical-booking-forms/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, image: string }
 */
medicalBookingFormsRouter.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, medical_booking_forms_middlewares_1.createMedicalBookingFormsValidator, (0, handlers_1.wrapRequestHandler)(medical_booking_forms_controllers_1.createMedicalBookingFormsController));
/**
 * Desscription: Update medical booking forms
 * Path: /medical-booking-forms/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, slug: string, image: string }
 */
medicalBookingFormsRouter.patch('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, medical_booking_forms_middlewares_1.updateMedicalBookingFormsValidator, (0, common_middlewares_1.filterMiddleware)(['name', 'image', 'slug']), (0, handlers_1.wrapRequestHandler)(medical_booking_forms_controllers_1.updateMedicalBookingFormsController));
/**
 * Desscription: Delete medical booking forms
 * Path: /medical-booking-forms/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
medicalBookingFormsRouter.delete('/delete/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, medical_booking_forms_middlewares_1.deleteMedicalBookingFormsValidator, (0, handlers_1.wrapRequestHandler)(medical_booking_forms_controllers_1.deleteMedicalBookingFormsController));
/**
 * Desscription: Get medical booking forms by id
 * Path: /medical-booking-forms/:id
 * Method: GET
 * Params: { id: string }
 */
medicalBookingFormsRouter.get('/:id', (0, handlers_1.wrapRequestHandler)(medical_booking_forms_controllers_1.getMedicalBookingFormsByIdController));
/**
 * Desscription: Get full list medical booking forms
 * Path: /medical-booking-forms
 * Method: GET
 */
medicalBookingFormsRouter.get('/', (0, handlers_1.wrapRequestHandler)(medical_booking_forms_controllers_1.getFullMedicalBookingFormsController));
exports.default = medicalBookingFormsRouter;

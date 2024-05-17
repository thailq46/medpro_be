"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hospitals_controllers_1 = require("../controllers/hospitals.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const hospitals_middlewares_1 = require("../middlewares/hospitals.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const hospitalsRoutes = (0, express_1.Router)();
/**
 * Desscription: Create hospitals
 * Path: /hospitals/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { HospitalsSchema }
 */
hospitalsRoutes.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, hospitals_middlewares_1.createHospitalValidator, (0, handlers_1.wrapRequestHandler)(hospitals_controllers_1.createHospitalController));
/**
 * Desscription: Update hospitals
 * Path: /hospitals/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 * Body: { HospitalsSchema }
 */
hospitalsRoutes.patch('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, hospitals_middlewares_1.checkParamsHospitalValidator, hospitals_middlewares_1.updateHospitalValidator, (0, common_middlewares_1.filterMiddleware)([
    'avatar',
    'address',
    'banner',
    'categoryId',
    'description',
    'end_time',
    'hotline',
    'images',
    'name',
    'session',
    'slug',
    'start_time',
    'types',
    'booking_forms'
]), (0, handlers_1.wrapRequestHandler)(hospitals_controllers_1.updateHospitalController));
/**
 * Desscription: Delete hospitals
 * Path: /hospitals/delete/:id
 * Method: DELET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
hospitalsRoutes.delete('/delete/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, hospitals_middlewares_1.checkParamsHospitalValidator, (0, handlers_1.wrapRequestHandler)(hospitals_controllers_1.deleteHospitalController));
/**
 * Desscription: Get hospitals by id
 * Path: /hospitals/:id
 * Method: GET
 * Params: { id: string }
 */
hospitalsRoutes.get('/:id', hospitals_middlewares_1.checkParamsHospitalValidator, (0, handlers_1.wrapRequestHandler)(hospitals_controllers_1.getHospitalsByIdController));
/**
 * Desscription: Get full list hospitals
 * Path: /hospitals
 * Method: GET
 * Query: { limit: number, page: number }
 */
hospitalsRoutes.get('/', common_middlewares_1.paginationValidator, (0, handlers_1.wrapRequestHandler)(hospitals_controllers_1.getFullHospitalsController));
exports.default = hospitalsRoutes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_controllers_1 = require("../controllers/services.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const services_middlewares_1 = require("../middlewares/services.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const servicesRoutes = (0, express_1.Router)();
/**
 * Desscription: Create new services
 * Path: /services/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { ServicesSchema }
 */
servicesRoutes.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, services_middlewares_1.createServicesValidator, (0, handlers_1.wrapRequestHandler)(services_controllers_1.createServicesController));
/**
 * Desscription: Update services by id
 * Path: /services/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { ServicesSchema }
 * Params: { id: string }
 */
servicesRoutes.patch('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, services_middlewares_1.checkParamsServiceID, services_middlewares_1.updateServicesValidator, (0, common_middlewares_1.filterMiddleware)([
    'description',
    'hospital_id',
    'name',
    'note',
    'price',
    'session',
    'specialty_id'
]), (0, handlers_1.wrapRequestHandler)(services_controllers_1.updateServicesController));
/**
 * Desscription: Delete services by id
 * Path: /services/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
servicesRoutes.delete('/delete/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, services_middlewares_1.checkParamsServiceID, (0, handlers_1.wrapRequestHandler)(services_controllers_1.deleteServicesController));
/**
 * Desscription: Get services by id
 * Path: /services/:id
 * Method: GET
 * Params: { id: string }
 */
servicesRoutes.get('/:id', services_middlewares_1.checkParamsServiceID, (0, handlers_1.wrapRequestHandler)(services_controllers_1.getServicesByIdController));
/**
 * Desscription: Get full services
 * Path: /services
 * Method: GET
 * Query: { limit: number, page: number }
 */
servicesRoutes.get('/', common_middlewares_1.paginationValidator, (0, handlers_1.wrapRequestHandler)(services_controllers_1.getFullServicesController));
exports.default = servicesRoutes;

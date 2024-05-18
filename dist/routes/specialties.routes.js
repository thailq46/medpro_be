"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specialties_controllers_1 = require("../controllers/specialties.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const specialties_middlewares_1 = require("../middlewares/specialties.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const specialtiesRouter = (0, express_1.Router)();
/**
 * Desscription: Create new specialties
 * Path: /specialties/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SpecialtiesSchema }
 */
specialtiesRouter.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, specialties_middlewares_1.createSpecialtiesValidator, (0, handlers_1.wrapRequestHandler)(specialties_controllers_1.createSpecialtiesController));
/**
 * Desscription: Update specialties
 * Path: /specialties/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SpecialtiesSchema }
 * Params: { id: string }
 */
specialtiesRouter.patch('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, specialties_middlewares_1.checkParamsSpecialtyID, specialties_middlewares_1.updateSpecialtiesValidator, (0, common_middlewares_1.filterMiddleware)(['description', 'hospital_id', 'name', 'slug']), (0, handlers_1.wrapRequestHandler)(specialties_controllers_1.updateSpecialtiesController));
/**
 * Desscription: Delete specialties by id
 * Path: /specialties/delete/:id
 * Method: DELETE
 * Params: { id: string }
 */
specialtiesRouter.delete('/delete/:id', specialties_middlewares_1.checkParamsSpecialtyID, (0, handlers_1.wrapRequestHandler)(specialties_controllers_1.deleteSpecialtiesController));
/**
 * Desscription: Get specialties by id
 * Path: /specialties/:id
 * Method: GET
 * Params: { id: string }
 */
specialtiesRouter.get('/:id', specialties_middlewares_1.checkParamsSpecialtyID, (0, handlers_1.wrapRequestHandler)(specialties_controllers_1.getSpecialtiesByIdController));
/**
 * Desscription: Get full specialties
 * Path: /specialties
 * Method: GET
 * Query: { limit: number, page: number }
 */
specialtiesRouter.get('/', common_middlewares_1.paginationValidator, (0, handlers_1.wrapRequestHandler)(specialties_controllers_1.getFullSpecialtiesController));
exports.default = specialtiesRouter;

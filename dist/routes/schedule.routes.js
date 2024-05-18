"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controllers_1 = require("../controllers/schedules.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const schedules_middlewares_1 = require("../middlewares/schedules.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const schedulesRouter = (0, express_1.Router)();
/**
 * Desscription: Create new schedules
 * Path: /schedules/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SchedulesSchema }
 */
schedulesRouter.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, schedules_middlewares_1.createSchedulesValidator, (0, handlers_1.wrapRequestHandler)(schedules_controllers_1.createSchedulesController));
/**
 * Desscription: Update schedules
 * Path: /schedules/update/:id
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { SchedulesSchema }
 * Params: { id: string }
 */
schedulesRouter.patch('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, schedules_middlewares_1.checkParamsScheduleId, schedules_middlewares_1.updateSchedulesValidator, (0, common_middlewares_1.filterMiddleware)(['current_number', 'max_number', 'date', 'time_type', 'doctor_id']), (0, handlers_1.wrapRequestHandler)(schedules_controllers_1.updateSchedulesController));
/**
 * Desscription: Delete schedules
 * Path: /schedules/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
schedulesRouter.delete('/delete/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, schedules_middlewares_1.checkParamsScheduleId, (0, handlers_1.wrapRequestHandler)(schedules_controllers_1.deleteSchedulesController));
/**
 * Desscription: Get schedules by id
 * Path: /schedules/:id
 * Method: GET
 * Params: { id: string }
 */
schedulesRouter.get('/:id', schedules_middlewares_1.checkParamsScheduleId, (0, handlers_1.wrapRequestHandler)(schedules_controllers_1.getSchedulesByIdController));
/**
 * Desscription: Get schedules
 * Path: /schedules
 * Method: GET
 */
schedulesRouter.get('/', (0, handlers_1.wrapRequestHandler)(schedules_controllers_1.getFullSchedulesController));
exports.default = schedulesRouter;

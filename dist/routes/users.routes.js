"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const usersRouter = (0, express_1.Router)();
/**
 * Desscription: Get information account in use
 * Path: /users/me
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', auth_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.getMeController));
/**
 * Desscription: Change information account in use
 * Path: /users/me
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { UserSchema }
 */
usersRouter.patch('/me', auth_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, users_middlewares_1.updateMeValidator, (0, common_middlewares_1.filterMiddleware)(['avatar', 'username', 'address', 'date_of_birth', 'gender', 'name', 'phone_number']), (0, handlers_1.wrapRequestHandler)(users_controllers_1.updateMeController));
/**
 * Desscription: Get user by username
 * Path: /users/:username
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { username: string }
 */
usersRouter.get('/:username', auth_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.getUserByUsernameController));
/**
 * Desscription: Update user by username
 * Path: /users/:username
 * Method: PATCH
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { username: string }
 * Body: { UserSchema }
 */
usersRouter.patch('/:username', auth_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, users_middlewares_1.updateUserByUsernameValidator, (0, common_middlewares_1.filterMiddleware)([
    'address',
    'avatar',
    'date_of_birth',
    'gender',
    'name',
    'phone_number',
    'position',
    'role',
    'username',
    'verify'
]), (0, handlers_1.wrapRequestHandler)(users_controllers_1.updateUserByUsernameController));
/**
 * Desscription: Delete user by username
 * Path: /users/:username
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { username: string }
 */
usersRouter.delete('/:username', auth_middlewares_1.accessTokenValidator, users_middlewares_1.verifiedUserValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.deleteUserByUsernameController));
/**
 * Desscription: Get list users
 * Path: /
 * Method: GET
 * Headers: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/', auth_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(users_controllers_1.getListUsersController));
exports.default = usersRouter;

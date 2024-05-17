"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controllers_1 = require("../controllers/categories.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const categories_middlewares_1 = require("../middlewares/categories.middlewares");
const common_middlewares_1 = require("../middlewares/common.middlewares");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const categoriesRouter = (0, express_1.Router)();
/**
 * Desscription: Create new category
 * Path: /categories/create
 * Method: POST
 * Headers: { Authorization: Bearer <access_token> }
 * Body: { name: string, slug: string, parent_id: string | null }
 */
categoriesRouter.post('/create', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, categories_middlewares_1.createCategoriesValidator, (0, handlers_1.wrapRequestHandler)(categories_controllers_1.createCategoriesController));
/**
 * Desscription: Update new category
 * Path: /categories/update/:id
 * Method: PUT
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 * Body: { name: string, slug: string, parent_id: string | null }
 */
categoriesRouter.put('/update/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, categories_middlewares_1.updateCategoriesValidator, (0, handlers_1.wrapRequestHandler)(categories_controllers_1.updateCategoriesController));
/**
 * Desscription: Delete category
 * Path: /categories/delete/:id
 * Method: DELETE
 * Headers: { Authorization: Bearer <access_token> }
 * Params: { id: string }
 */
categoriesRouter.delete('/delete/:id', (0, common_middlewares_1.isUserLoggedInValidator)(auth_middlewares_1.accessTokenValidator), users_middlewares_1.verifiedUserValidator, (0, handlers_1.wrapRequestHandler)(categories_controllers_1.deleteCategoriesController));
/**
 * Desscription: Get categories by id
 * Path: /categories/:id
 * Method: GET
 * Params: { id: string }
 */
categoriesRouter.get('/:id', (0, handlers_1.wrapRequestHandler)(categories_controllers_1.getCategoryByIdController));
/**
 * Desscription: Get full list categories
 * Path: /categories
 * Method: GET
 */
categoriesRouter.get('/', (0, handlers_1.wrapRequestHandler)(categories_controllers_1.getFullCategoriesController));
exports.default = categoriesRouter;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controllers_1 = require("../controllers/medias.controllers");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const handlers_1 = require("../utils/handlers");
const mediasRoutes = (0, express_1.Router)();
mediasRoutes.post('/upload-image', auth_middlewares_1.accessTokenValidator, (0, handlers_1.wrapRequestHandler)(medias_controllers_1.uploadImageController));
exports.default = mediasRoutes;

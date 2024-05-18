"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controllers_1 = require("../controllers/medias.controllers");
const staticRoutes = (0, express_1.Router)();
staticRoutes.get('/image/:name', medias_controllers_1.serveImageController);
exports.default = staticRoutes;

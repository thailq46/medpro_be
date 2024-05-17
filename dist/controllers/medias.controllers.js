"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveImageController = exports.uploadImageController = void 0;
const path_1 = __importDefault(require("path"));
const dir_1 = require("../constants/dir");
const messages_1 = require("../constants/messages");
const medias_service_1 = __importDefault(require("../services/medias.service"));
const uploadImageController = async (req, res) => {
    const result = await medias_service_1.default.uploadImageGoogleDriver(req);
    return res.json({
        message: messages_1.MEDIAS_MESSAGE.UPLOAD_SUCCESS,
        data: result
    });
};
exports.uploadImageController = uploadImageController;
const serveImageController = async (req, res) => {
    const { name } = req.params;
    return res.sendFile(path_1.default.resolve(dir_1.UPLOAD_IMAGE_DIR, name), (err) => {
        if (err) {
            return res.status(err.status).json({
                message: messages_1.USERS_MESSAGE.IMAGE_NOT_FOUND
            });
        }
    });
};
exports.serveImageController = serveImageController;

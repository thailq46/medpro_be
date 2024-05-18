"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../constants/config");
const signToken = ({ payload, secretOrPrivateKey = config_1.envConfig.secretOrPrivateKey, options = {
    algorithm: 'HS256'
} }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) {
                throw reject(err);
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = ({ token, secretOrPrivateKey = config_1.envConfig.secretOrPrivateKey }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secretOrPrivateKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            // console.log('jwt.verify ~ decoded', decoded)
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;

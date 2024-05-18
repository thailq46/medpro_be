"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestHandler = void 0;
const wrapRequestHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.wrapRequestHandler = wrapRequestHandler;

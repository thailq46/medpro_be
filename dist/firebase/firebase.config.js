"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = void 0;
const config_1 = require("../constants/config");
exports.firebaseConfig = {
    apiKey: config_1.envConfig.firebaseApiKey,
    authDomain: config_1.envConfig.firebaseAuthDomain,
    projectId: config_1.envConfig.firebaseProjectId,
    storageBucket: config_1.envConfig.firebaseStorageBucket,
    messagingSenderId: config_1.envConfig.firebaseMessagingSenderId,
    appId: config_1.envConfig.firebaseAppId,
    measurementId: config_1.envConfig.firebaseMeasurementId
};
// Initialize Firebase

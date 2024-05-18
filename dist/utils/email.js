"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.emailService = void 0;
const googleapis_1 = require("googleapis");
const config_1 = require("../constants/config");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.emailService = {
    MAIL_MAILER: config_1.envConfig.mail_mailer,
    MAIL_HOST: config_1.envConfig.mail_host,
    MAIL_PORT: config_1.envConfig.mail_port,
    MAIL_USERNAME: config_1.envConfig.mail_username,
    MAIL_PASSWORD: config_1.envConfig.mail_password,
    MAIL_ENCRYPTION: config_1.envConfig.mail_encryption,
    MAIL_FROM_ADDRESS: config_1.envConfig.mail_from_address,
    MAIl_FROM_NAME: config_1.envConfig.mail_from_name
};
const oAuth2Client = new googleapis_1.google.auth.OAuth2(config_1.envConfig.ggmail_client_id, config_1.envConfig.ggmail_client_secret, config_1.envConfig.ggdriver_redirec_uri);
oAuth2Client.setCredentials({ refresh_token: config_1.envConfig.ggmail_refresh_token });
const sendMail = async ({ to, subject, htmlContent }) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer_1.default.createTransport({
            host: exports.emailService.MAIL_HOST,
            port: parseInt(exports.emailService.MAIL_PORT),
            secure: false,
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: exports.emailService.MAIL_USERNAME,
                clientId: config_1.envConfig.ggmail_client_id,
                clientSecret: config_1.envConfig.ggmail_client_secret,
                refreshToken: config_1.envConfig.ggmail_refresh_token,
                accessToken: accessToken
            }
        });
        const options = {
            from: exports.emailService.MAIL_FROM_ADDRESS,
            to: to,
            subject: subject,
            html: htmlContent
        };
        return transport.sendMail(options);
    }
    catch (err) {
        console.log(err);
    }
};
exports.sendMail = sendMail;

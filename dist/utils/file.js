"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploadImage = exports.getNameFromFullname = exports.initFolder = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const formidable_1 = __importDefault(require("formidable"));
const dir_1 = require("../constants/dir");
const MAX_FILES_IMAGE = 4;
const MAX_FILE_SIZE_IMAGE = 3000 * 1024;
const MAX_TOTAL_FILE_SIZE_IMAGE = MAX_FILE_SIZE_IMAGE * MAX_FILES_IMAGE;
const initFolder = () => {
    ;
    [dir_1.UPLOAD_IMAGE_TEMP_DIR].forEach((dir) => {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
    });
};
exports.initFolder = initFolder;
const getNameFromFullname = (fullname) => {
    // fullname: 98c5a6201de4a947269734501.png
    const ext = path_1.default.extname(fullname); // .png
    return path_1.default.basename(fullname, ext); // 98c5a6201de4a947269734501
};
exports.getNameFromFullname = getNameFromFullname;
const handleUploadImage = (req) => {
    const form = (0, formidable_1.default)({
        uploadDir: dir_1.UPLOAD_IMAGE_TEMP_DIR,
        keepExtensions: true,
        maxFiles: MAX_FILES_IMAGE,
        filter: ({ name, originalFilename, mimetype }) => {
            const valid = ['image', 'avatar', 'cover_photo'].includes(name) && Boolean(mimetype?.includes('image/'));
            if (!valid) {
                form.emit('error', new Error('File type is not valid'));
            }
            return valid;
        }
    });
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            // eslint-disable-next-line no-extra-boolean-cast
            if (!Boolean(files.image)) {
                return reject(new Error('Image is empty'));
            }
            resolve(files.image);
        });
    });
};
exports.handleUploadImage = handleUploadImage;

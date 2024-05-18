"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const dir_1 = require("../constants/dir");
const file_1 = require("../utils/file");
const fs_1 = __importDefault(require("fs"));
const config_1 = require("../constants/config");
const enum_1 = require("../constants/enum");
const googleapis_1 = require("googleapis");
const oauth2Client = new googleapis_1.google.auth.OAuth2(config_1.envConfig.ggdriver_client_id, config_1.envConfig.ggdriver_client_secret, config_1.envConfig.ggdriver_redirec_uri);
oauth2Client.setCredentials({ refresh_token: config_1.envConfig.ggdriver_refresh_token });
const driver = googleapis_1.google.drive({
    version: 'v3',
    auth: oauth2Client
});
class MediasService {
    async uploadImage(req) {
        const files = await (0, file_1.handleUploadImage)(req);
        const result = await Promise.all(files.map(async (file) => {
            const newName = (0, file_1.getNameFromFullname)(file.newFilename);
            /** newPath
             * D:\NodeJS\Medpro_BE\uploads\images\017b0a957a387adf5ecfa6200.jpg
             */
            const newPath = path_1.default.resolve(dir_1.UPLOAD_IMAGE_DIR, `${newName}.jpg`);
            await (0, sharp_1.default)(file.filepath).jpeg().toFile(newPath);
            fs_1.default.unlinkSync(file.filepath);
            return {
                url: `http://localhost:${config_1.envConfig.port}/static/image/${newName}.jpg`,
                type: enum_1.MediaType.Image
            };
        }));
        return result;
    }
    // async uploadImageFirebase(req: Request) {
    //   const storageFB = getStorage()
    //   const files = await handleUploadImage(req)
    //   const result: Media[] = await Promise.all(
    //     files.map(async (file) => {
    //       const newName = getNameFromFullname(file.newFilename)
    //       const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
    //       // const fileBuffer = await sharp(file.filepath).jpeg().toBuffer()
    //       const storageRef = ref(storageFB, newName)
    //       const metadata: UploadMetadata = {
    //         contentType: file.mimetype as string
    //       }
    //       await sharp(file.filepath).jpeg().toFile(newPath)
    //       const fileBuffer = fs.readFileSync(file.filepath)
    //       const snapshot = await uploadBytesResumable(storageRef, fileBuffer, metadata)
    //       const downloadURL = await getDownloadURL(snapshot.ref)
    //       fs.unlinkSync(file.filepath)
    //       return {
    //         url: downloadURL,
    //         type: MediaType.Image
    //       }
    //     })
    //   )
    //   return result
    // }
    async uploadImageGoogleDriver(req) {
        const files = await (0, file_1.handleUploadImage)(req);
        const result = await Promise.all(files.map(async (file) => {
            const newName = (0, file_1.getNameFromFullname)(file.newFilename);
            const newPath = path_1.default.resolve(dir_1.UPLOAD_IMAGE_DIR, `${newName}.jpg`);
            const [_, mimeType] = await Promise.all([
                await (0, sharp_1.default)(file.filepath).jpeg().toFile(newPath),
                (await (0, sharp_1.default)(newPath).jpeg().metadata()).format
            ]);
            const createFile = await driver.files.create({
                requestBody: {
                    name: newName,
                    mimeType: 'image/jpg'
                },
                media: {
                    mimeType: 'image/jpg',
                    body: fs_1.default.createReadStream(newPath)
                }
            });
            const fileId = createFile.data.id;
            await driver.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            });
            console.log(createFile.data);
            const getURL = await driver.files.get({
                fileId,
                fields: 'webViewLink, webContentLink'
            });
            fs_1.default.unlinkSync(file.filepath);
            return {
                url: getURL.data.webViewLink,
                type: enum_1.MediaType.Image
            };
        }));
        return result;
    }
    async deleteImageGoogleDriver(fileId) {
        const deleteFile = await driver.files.delete({
            fileId
        });
        return deleteFile.data;
    }
}
const mediasService = new MediasService();
exports.default = mediasService;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const error_1 = require("../core/enums/error");
const parser = new parser_1.default();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    path: "https://res.cloudinary.com/ted/image/upload/"
});
class ImageService {
    validateImage(image) {
        // Array of allowed files
        const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
        const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
        // Get the extension of the uploaded file
        const file_extension = image.originalname.slice(((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2);
        // Check if the uploaded file is allowed
        if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.memetype)) {
            return error_1.Error.INVALID_IMAGE_TYPE;
        }
        // Allowed file size in mb
        const allowed_file_size = 2;
        if ((image.size / (1024 * 1024)) > allowed_file_size) {
            return error_1.Error.INVALID_IMAGE_SIZE;
        }
        return "";
    }
    uploadImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const extName = path_1.default.extname(image.originalname).toString();
            const file64 = parser.format(extName, image.buffer);
            return cloudinary_1.default.v2.uploader.upload(file64.content, { folder: "TED" });
        });
    }
}
exports.default = new ImageService();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const user_profileController_1 = require("../controllers/user.profileController");
const multer_fileuploader_1 = require("../middleware/multer.fileuploader");
const profileRoute = express_1.default.Router();
profileRoute.route('/').get();
profileRoute.route('/getProfile').get(auth_1.authenticateToken, user_profileController_1.getprofileController);
profileRoute.route('/setpicture').post(auth_1.authenticateToken, multer_fileuploader_1.upload.single('photo'), user_profileController_1.setProfilepicController);
exports.default = profileRoute;
//# sourceMappingURL=user.updateprofile.js.map
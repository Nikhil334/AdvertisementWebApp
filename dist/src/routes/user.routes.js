"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const user_datavalidation_1 = require("../middleware/user.datavalidation");
const auth_1 = require("../middleware/auth");
const userRoute = express_1.default.Router();
userRoute.route('/').get();
userRoute.route('/signup').post(user_datavalidation_1.checkRegisterData, user_controller_1.signupController);
userRoute.route('/login').post(user_datavalidation_1.checkLogindata, user_controller_1.loginController);
userRoute.route('/logout').post(auth_1.authenticateToken, user_controller_1.logoutcontrol);
userRoute.route('/forget').post(user_controller_1.forgetpasscontroller);
userRoute.route('/addAddress').post(auth_1.authenticateToken, user_controller_1.addressaddController);
userRoute.route("/resetpass").post(user_controller_1.resetpasscontroller);
exports.default = userRoute;
//# sourceMappingURL=user.routes.js.map
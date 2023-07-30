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
exports.forgetpassservice = exports.logoutservice = exports.loginServices = exports.addAddress = exports.signupservice = void 0;
const user_schema_1 = require("../models/user.schema");
const user_sessionschema_1 = require("../models/user.sessionschema");
const user_addressschema_1 = require("../models/user.addressschema");
const user_sessionController_1 = require("../controllers/user.sessionController");
const user_sessionredis_1 = require("../middleware/user.sessionredis");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT = parseInt(process.env.SALT);
const signupservice = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const encryptPass = yield bcrypt_1.default.hash(req.body.password, SALT);
        userData.password = encryptPass;
        const usertabledata = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            status: userData.status,
            profile: userData.profile,
            mobNumber: userData.mobNumber,
            gender: userData.gender,
            dob: userData.dob,
            firstName: userData.firstName,
            lastName: userData.lastName,
        };
        const user = yield user_schema_1.User.create(userData);
        return user;
    }
    catch (error) {
        return error;
    }
    ;
});
exports.signupservice = signupservice;
const addAddress = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressData = req.body;
        const Addresstabledata = {
            houseNo: addressData.houseNo,
            streetNo: addressData.streetNo,
            area: addressData.area,
            landmark: addressData.landmark,
            city: addressData.city,
            country: addressData.country,
            zipCode: addressData.zipCode,
            state: addressData.state,
            status: addressData.status,
            userId: req.user.user_id,
            addressType: addressData.addressType
        };
        const address = yield user_addressschema_1.Address.create(Addresstabledata);
        return address;
    }
    catch (error) {
        return error;
    }
    ;
});
exports.addAddress = addAddress;
const loginServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userdata = req.body;
        const email = userdata.email;
        const user = yield user_schema_1.User.findOne({ where: { email: email } });
        if (!user) {
            return false;
        }
        else {
            const passmatch = yield bcrypt_1.default.compare(userdata.password, user.password);
            if (!passmatch) {
                return false;
            }
            else {
                const token = jsonwebtoken_1.default.sign({ email: user.email, user_id: user.id, username: user.username }, process.env.secretKey, { expiresIn: '12h' });
                console.log(token);
                yield (0, user_sessionController_1.maintain_session_control)(res, user);
                return true;
            }
        }
    }
    catch (err) {
        return false;
    }
});
exports.loginServices = loginServices;
const forgetpassservice = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUser = user_schema_1.User.findOne({ where: { email: req.body.email } });
        console.log(isUser);
        if (isUser) {
            const encryptPass = yield bcrypt_1.default.hash(req.body.password, SALT);
            yield user_schema_1.User.update({ password: encryptPass }, { where: { email: req.body.email } });
            return true;
        }
        else {
            return false;
        }
    }
    catch (_a) {
        return false;
    }
});
exports.forgetpassservice = forgetpassservice;
const logoutservice = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSession = yield user_sessionschema_1.Session.findOne({ where: { username: req.user.username } });
        if (isSession) {
            if (isSession.status) {
                console.log(isSession);
                yield user_sessionschema_1.Session.update({ status: !isSession.status }, { where: { id: isSession.id } });
                yield (0, user_sessionredis_1.distroySession)(req.user);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
});
exports.logoutservice = logoutservice;
//# sourceMappingURL=user.service.js.map
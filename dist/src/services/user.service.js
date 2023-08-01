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
exports.reset_password = exports.forgetpassservice = exports.logoutservice = exports.loginServices = exports.addAddress = exports.signupservice = void 0;
const user_schema_1 = require("../models/user.schema");
const user_sessionschema_1 = require("../models/user.sessionschema");
const user_addressschema_1 = require("../models/user.addressschema");
const user_sessionController_1 = require("../controllers/user.sessionController");
const user_sessionredis_1 = require("../middleware/user.sessionredis");
const user_sessionredis_2 = require("../middleware/user.sessionredis");
const nodemailer_1 = __importDefault(require("nodemailer"));
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
// const forgetpassservice = async (req: Request) => {
//     try{
//         const isUser = User.findOne({where:{email:req.body.email}});
//         console.log(isUser);
//         if(isUser){
//             const encryptPass = await bcrypt.hash(req.body.password, SALT);
//             await User.update({password:encryptPass},{ where: {email:req.body.email} });
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
//     catch{
//         return false;
//     }
// }
const forgetpassservice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_schema_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Email not found' });
        }
        let OTP = Math.floor(1000 + Math.random() * 9000);
        (0, user_sessionredis_2.save_otp)(email, OTP);
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you have requested a password reset for your account.\n\n RESET PASSWORD OTP: ${OTP}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Error sending email' });
            }
            else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Password reset link sent to email' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.forgetpassservice = forgetpassservice;
const reset_password = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = req.body;
        const user = yield user_schema_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Email not found' });
        }
        const userOTP = yield (0, user_sessionredis_2.get_otp)(email);
        console.log(userOTP);
        if (!userOTP || userOTP !== otp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }
        const encryptPass = yield bcrypt_1.default.hash(newPassword, SALT);
        user.password = encryptPass;
        console.log(user.password);
        yield user.save();
        return res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.reset_password = reset_password;
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
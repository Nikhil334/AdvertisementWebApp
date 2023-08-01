"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogindata = exports.checkRegisterData = void 0;
const joi_1 = __importDefault(require("joi"));
const registerValidation = joi_1.default.object({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    mobNumber: joi_1.default.number().min(1000000000).max(999999999999),
    firstName: joi_1.default.string().min(3).required(),
    lastName: joi_1.default.string().min(3).required(),
});
const loginValidation = joi_1.default.object({
    username: joi_1.default.string(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
const validatedata = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.body = value;
        next();
    };
};
exports.checkRegisterData = validatedata(registerValidation);
exports.checkLogindata = validatedata(loginValidation);
//# sourceMappingURL=user.datavalidation.js.map
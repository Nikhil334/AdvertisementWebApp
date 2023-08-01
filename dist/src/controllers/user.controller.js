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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetpasscontroller = exports.forgetpasscontroller = exports.logoutcontrol = exports.addressaddController = exports.loginController = exports.signupController = void 0;
const user_service_1 = require("../services/user.service");
const signupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.signupservice)(req);
        if (!result) {
            res.status(400).json({ error: 'Failed to insert user data' });
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to insert user data' });
    }
});
exports.signupController = signupController;
const addressaddController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.addAddress)(req);
        if (!result) {
            res.status(400).json({ error: 'Failed to insert user data' });
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to insert user data' });
    }
});
exports.addressaddController = addressaddController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.loginServices)(req, res);
        if (!result) {
            res.status(400).send("user credentials are not valid");
        }
        res.status(201).send(`loggedIn : ${result}`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.loginController = loginController;
const forgetpasscontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_1.forgetpassservice)(req, res);
        // if (!result) {
        // res.status(400).send("invalid email");
        // }
        res.status(201).send(`otp sent successfully`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.forgetpasscontroller = forgetpasscontroller;
const resetpasscontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_service_1.reset_password)(req, res);
        // if (!result) {
        // res.status(400).send("invalid email");
        // }
        res.status(201).send(`password changed successfully`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.resetpasscontroller = resetpasscontroller;
const logoutcontrol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.logoutservice)(req);
        if (!result) {
            res.status(404).json({ message: "User is already inactiv" });
        }
        else {
            res.status(201).json({ message: "User logOut Successfully" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});
exports.logoutcontrol = logoutcontrol;
//# sourceMappingURL=user.controller.js.map
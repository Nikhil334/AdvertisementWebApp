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
exports.get_otp = exports.save_otp = exports.distroySession = exports.maintain_session_redis = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.connect();
const maintain_session_redis = (user) => __awaiter(void 0, void 0, void 0, function* () {
    client.on('error', err => console.log('Redis client error', err));
    try {
        yield client.SET(user.username, JSON.stringify({
            'user_id': user.email,
            'status': true
        }));
        const session = yield client.get(user.username);
        console.log(session);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.maintain_session_redis = maintain_session_redis;
const distroySession = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        yield client.SET(user.username, JSON.stringify({
            'user_id': user.email,
            'status': false
        }));
    }
    catch (err) {
        console.log(err);
    }
});
exports.distroySession = distroySession;
const save_otp = (email, OTP) => __awaiter(void 0, void 0, void 0, function* () {
    client.on('error', err => console.log('Redis client error', err));
    try {
        yield client.setEx(email, 300, JSON.stringify({
            otp: OTP
        }));
        console.log("otp stored successfully");
    }
    catch (err) {
        console.log(err);
    }
});
exports.save_otp = save_otp;
const get_otp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield client.exists(email)) {
        const otp_details = yield client.get(email);
        const userOTP = JSON.parse(otp_details);
        return userOTP.otp;
    }
    else {
        return false;
    }
});
exports.get_otp = get_otp;
//# sourceMappingURL=user.sessionredis.js.map
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
exports.maintain_session_service = void 0;
const user_sessionredis_1 = require("../middleware/user.sessionredis");
const user_sessionschema_1 = require("../models/user.sessionschema");
const maintain_session_service = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(user);
        let isSession = yield user_sessionschema_1.Session.findOne({ where: { user_id: user.id } });
        if (!isSession) {
            const session_details = {
                user_id: user.id,
                username: user.username
            };
            const session = yield user_sessionschema_1.Session.create(session_details);
            console.log("Session stored successfully");
            // console.log(session);
        }
        else if (isSession) {
            if (!isSession.status) {
                isSession = yield user_sessionschema_1.Session.update({ status: !isSession.status }, { where: { username: user.username } });
                console.log(isSession);
                console.log("Session Activate");
            }
        }
        yield (0, user_sessionredis_1.maintain_session_redis)(user);
        return true;
    }
    catch (err) {
        console.log("Server Error");
        return false;
    }
});
exports.maintain_session_service = maintain_session_service;
//# sourceMappingURL=user.sessionservice.js.map
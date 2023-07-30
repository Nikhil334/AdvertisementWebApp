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
exports.maintain_session_control = void 0;
const user_sessionservice_1 = require("../services/user.sessionservice");
const maintain_session_control = (res, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_sessionservice_1.maintain_session_service)(user);
        if (!result) {
            res.status(401).send("There is some problem to maintain session.");
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server Error", err });
        console.log("Server Error");
    }
});
exports.maintain_session_control = maintain_session_control;
//# sourceMappingURL=user.sessionController.js.map
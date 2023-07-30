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
exports.setprofilepic = exports.getProfile = void 0;
const user_schema_1 = require("../models/user.schema");
const user_addressschema_1 = require("../models/user.addressschema");
const fs = require('fs');
const getProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = yield user_schema_1.User.findOne({ where: { email: req.user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
        const addressData = yield user_addressschema_1.Address.findOne({ where: { userId: userData.id }, attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'status', 'userId'] } });
        return [userData, addressData];
    }
    catch (_a) {
        return false;
    }
});
exports.getProfile = getProfile;
const setprofilepic = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.file.buffer);
        const file = req.file;
        const fileData = fs.readFileSync(file.path);
        const bufferData = Buffer.from(fileData);
        console.log(bufferData);
        const result = user_schema_1.User.update({ profilePic: bufferData }, { where: { email: req.user.email } });
        return true;
        // return true;
        // const myModelInstance = await User.findOne({ where: {email: req.user.email} });
        // const blobData = myModelInstance.profilePic;
        // console.log(blobData);
        // fs.writeFileSync('../myFile.png', blobData);
    }
    catch (_b) {
        return false;
    }
});
exports.setprofilepic = setprofilepic;
//# sourceMappingURL=user.profileservices.js.map
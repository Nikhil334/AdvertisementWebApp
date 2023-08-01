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
exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = require("../config/conn");
const User = conn_1.sqlize.define('user', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.default.STRING,
        unique: true,
        allowNull: false
    },
    firstName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    mobNumber: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    dob: {
        type: sequelize_1.default.DATEONLY,
        allowNull: true
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    profilePic: {
        type: sequelize_1.default.BLOB,
        allowNull: true
    },
    createdAt: {
        type: sequelize_1.default.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: sequelize_1.default.DATE,
        default: Date.now()
    }
});
exports.User = User;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield User.sync({ alter: true });
    });
})();
//# sourceMappingURL=user.schema.js.map
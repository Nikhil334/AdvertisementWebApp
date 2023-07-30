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
exports.dbconnection = exports.sqlize = void 0;
const Sequelize = require('sequelize');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sqlize = new Sequelize(process.env.dbName, process.env.userName, process.env.password, {
    host: process.env.host,
    dialect: process.env.dialect,
    pool: {
        max: 10,
        min: 0,
        aquire: 3000,
        idle: 10000
    }
});
exports.sqlize = sqlize;
const dbconnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgonconnect = yield sqlize.authenticate;
        console.log('Connection has been established successfully.');
    }
    catch (err) {
        console.error('Unable to connect to the database:', err);
    }
});
exports.dbconnection = dbconnection;
//# sourceMappingURL=conn.js.map
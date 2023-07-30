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
exports.Category = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = require("../config/conn");
const Category = conn_1.sqlize.define('Categories', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.default.INTEGER
    },
    Category: {
        type: sequelize_1.default.STRING
    },
    Subcategory: {
        type: sequelize_1.default.STRING
    },
    createdAt: {
        allowNull: true,
        type: sequelize_1.default.DATE,
    },
    updatedAt: {
        allowNull: true,
        type: sequelize_1.default.DATE,
    }
});
exports.Category = Category;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield Category.sync();
    });
})();
//# sourceMappingURL=product.category.schema.js.map
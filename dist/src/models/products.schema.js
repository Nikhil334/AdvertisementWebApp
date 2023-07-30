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
exports.Product = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = require("../config/conn");
const Product = conn_1.sqlize.define('Product', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    images: {
        type: sequelize_1.default.ARRAY(sequelize_1.default.BLOB),
        allowNull: true,
    },
    heigher_bidding_price: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
    },
    Bidderid: {
        type: sequelize_1.default.INTEGER,
        allowNull: true,
        reference: {
            model: 'User',
            key: 'id'
        }
    },
    base_price: {
        type: sequelize_1.default.FLOAT,
        allowNull: false,
    },
    seller_id: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        reference: {
            model: 'User',
            key: 'id'
        }
    },
    subcategory: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        reference: {
            model: 'Category',
            key: 'Subcategory'
        }
    }
});
exports.Product = Product;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield Product.sync();
    });
})();
//# sourceMappingURL=products.schema.js.map
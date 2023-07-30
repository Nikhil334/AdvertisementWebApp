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
exports.Address = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const conn_1 = require("../config/conn");
const Address = conn_1.sqlize.define('address', {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    houseNo: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    streetNo: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    area: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    landmark: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    city: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    country: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    zipCode: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    state: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    addressType: {
        type: sequelize_1.default.STRING,
        allowNull: false
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
exports.Address = Address;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield Address.sync();
    });
})();
//# sourceMappingURL=user.addressschema.js.map
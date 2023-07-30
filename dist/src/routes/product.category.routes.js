"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const product_categoryControllers_1 = require("../controllers/product.categoryControllers");
const categoryRoute = express_1.default.Router();
categoryRoute.route('/').get();
categoryRoute.route('/getcategories').get(auth_1.authenticateToken, product_categoryControllers_1.getCategoryController);
categoryRoute.route('/getsubcategories').post(auth_1.authenticateToken, product_categoryControllers_1.getsubCategoryController);
exports.default = categoryRoute;
//# sourceMappingURL=product.category.routes.js.map
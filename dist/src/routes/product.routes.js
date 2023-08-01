"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const product_controller_1 = require("../controllers/product.controller");
const productRoute = express_1.default.Router();
const multer_fileuploader_1 = require("../middleware/multer.fileuploader");
productRoute.route('/').get();
productRoute.route('/addproducts').post(auth_1.authenticateToken, product_controller_1.addProductController);
productRoute.route('/addimages/:pid').post(auth_1.authenticateToken, multer_fileuploader_1.upload.array('images', 5), product_controller_1.setproductimagesController);
productRoute.route('/deleteproduct/:id').get(auth_1.authenticateToken, product_controller_1.deleteproductController);
productRoute.route('/updateproduct/:pid').post(auth_1.authenticateToken, product_controller_1.updateProductController);
productRoute.route('/getdetails/:pid').get(auth_1.authenticateToken, product_controller_1.getProductDetailsController);
productRoute.route('/raisedbidding/:pid').post(auth_1.authenticateToken, product_controller_1.getbiddingController);
exports.default = productRoute;
//# sourceMappingURL=product.routes.js.map
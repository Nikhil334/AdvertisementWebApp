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
exports.deleteproduct = exports.addimages = exports.addProduct = void 0;
const products_schema_1 = require("../models/products.schema");
const { Op } = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const addProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Productdata = req.body;
        Productdata.heigher_bidding_price = Productdata.base_price;
        const product = yield products_schema_1.Product.create(Productdata);
        return product;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.addProduct = addProduct;
const addimages = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.files);
        const pid = req.params.pid;
        const files = req.files;
        const bufferDataArray = [];
        for (let file in files) {
            const fileData = fs_1.default.readFileSync(files[file].path);
            const bufferData = Buffer.from(fileData);
            bufferDataArray.push(bufferData);
        }
        console.log(req.user);
        const product = yield products_schema_1.Product.update({ images: bufferDataArray }, { where: { [Op.and]: { seller_id: req.user.user_id, id: pid } } });
        console.log(product);
        // const result = Product.update({ images: bufferData }, { where: { user_id: req.user.user_id } });
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.addimages = addimages;
const deleteproduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield products_schema_1.Product.findByPk(req.params.id);
        if (!product) {
            return false;
        }
        else {
            yield product.destroy();
            return true;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.deleteproduct = deleteproduct;
//# sourceMappingURL=product.service.js.map
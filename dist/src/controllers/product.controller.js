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
exports.deleteproductController = exports.setproductimagesController = exports.addProductController = void 0;
const product_service_1 = require("../services/product.service");
const addProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_service_1.addProduct)(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.addProductController = addProductController;
const setproductimagesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_service_1.addimages)(req);
        if (result[0] == 0) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send("updated successfully");
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.setproductimagesController = setproductimagesController;
const deleteproductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_service_1.deleteproduct)(req, res);
        if (!result) {
            res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteproductController = deleteproductController;
//# sourceMappingURL=product.controller.js.map
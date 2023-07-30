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
exports.getsubCategoryController = exports.getCategoryController = void 0;
const product_Category_service_1 = require("../services/product.Category.service");
const getCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_Category_service_1.getCategory)(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.getCategoryController = getCategoryController;
const getsubCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, product_Category_service_1.getsubCategory)(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
});
exports.getsubCategoryController = getsubCategoryController;
//# sourceMappingURL=product.categoryControllers.js.map
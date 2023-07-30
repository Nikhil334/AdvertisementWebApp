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
exports.getsubCategory = exports.getCategory = void 0;
const product_category_schema_1 = require("../models/product.category.schema");
const getCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = yield product_category_schema_1.Category.findAll({ attributes: ['Category'], group: 'Category' });
        //const subcategoryData = await Category.findAll({ where: { Category:req.body.category},distinct:'Category',attributes: { exclude: ['subcategory', 'createdAt', 'updatedAt'] } });
        return categoryData;
    }
    catch (_a) {
        return false;
    }
});
exports.getCategory = getCategory;
const getsubCategory = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcategoryData = yield product_category_schema_1.Category.findAll({ where: { Category: req.body.category }, distinct: 'Category', attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return subcategoryData;
    }
    catch (_b) {
        return false;
    }
});
exports.getsubCategory = getsubCategory;
//# sourceMappingURL=product.Category.service.js.map
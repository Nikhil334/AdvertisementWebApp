import { Category } from "../models/product.category.schema";
import { Request, Response } from "express";

const getCategory = async (req: Request) => {
    try {
        const categoryData = await Category.findAll({attributes:['Category'],group:'Category'});
        //const subcategoryData = await Category.findAll({ where: { Category:req.body.category},distinct:'Category',attributes: { exclude: ['subcategory', 'createdAt', 'updatedAt'] } });
        return categoryData;
    }
    catch {
        return false;
    }
}

const getsubCategory = async (req: Request) => {
    try {
        const subcategoryData = await Category.findAll({where:{Category:req.body.category},distinct:'Category',attributes: { exclude: ['createdAt', 'updatedAt'] } });
        return subcategoryData;
    }
    catch {
        return false;
    }
}

export {getCategory,getsubCategory};
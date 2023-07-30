import { Request, Response } from "express";
import { getCategory,getsubCategory } from "../services/product.Category.service";

const getCategoryController =async (req:Request,res:Response)=>{
    try {
        const result = await getCategory(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}

const getsubCategoryController =async (req:Request,res:Response)=>{
    try {
        const result = await getsubCategory(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}
export {getCategoryController,getsubCategoryController};
import { Request, Response } from "express";
import { getProfile, setprofilepic } from "../services/user.profileservices";


const getprofileController =async (req:Request,res:Response)=>{
    try {
        const result = await getProfile(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}

const setProfilepicController = async (req:Request,res:Response)=>{
    try {
        const result = await setprofilepic(req);
        if (!result) {
            res.status(400).send("Something went wrong");
        }
        res.status(201).send("updated successfully");
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}
export {getprofileController,setProfilepicController};
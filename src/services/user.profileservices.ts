import { User } from "../models/user.schema";
import { Address } from "../models/user.addressschema";
import { upload } from "../middleware/multer.fileuploader";
const fs = require('fs');
import { Request, Response } from "express";

const getProfile = async (req: Request) => {
    try {
        const userData = await User.findOne({ where: { email: req.user.email }, attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } });
        const addressData = await Address.findOne({ where: { userId: userData.id }, attributes: { exclude: ['id', 'createdAt', 'updatedAt', 'status', 'userId'] } });
        return [userData, addressData];
    }
    catch {
        return false;
    }

}

const setprofilepic = async (req: Request) => {
    try {
        //console.log(req.file.buffer);
        const file = req.file;
        const fileData = fs.readFileSync(file.path);
        const bufferData = Buffer.from(fileData);
        console.log(bufferData);
        const result = User.update({ profilePic: bufferData }, { where: { email: req.user.email } });
        
        return true;
        // return true;

        // const myModelInstance = await User.findOne({ where: {email: req.user.email} });
        // const blobData = myModelInstance.profilePic;
        // console.log(blobData);
        // fs.writeFileSync('../myFile.png', blobData);
    }
    catch {
        return false;
    }
}

export { getProfile, setprofilepic};
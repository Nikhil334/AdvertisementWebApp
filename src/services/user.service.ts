import { User } from "../models/user.schema";
import { Session } from "../models/user.sessionschema";
import { Address } from "../models/user.addressschema";
import { maintain_session_control } from "../controllers/user.sessionController";
import { distroySession } from "../middleware/user.sessionredis";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const SALT = parseInt(process.env.SALT);

const signupservice = async (req: Request) => {
    try {
        const userData = req.body;
        const encryptPass = await bcrypt.hash(req.body.password, SALT);
        userData.password = encryptPass;
        const usertabledata = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            status: userData.status,
            profile: userData.profile,
            mobNumber: userData.mobNumber,
            gender: userData.gender,
            dob: userData.dob,
            firstName: userData.firstName,
            lastName: userData.lastName,
        }

        const user = await User.create(userData);
        return user;
    }
    catch (error) {
        return error;
    };
}


const addAddress = async (req: Request) => {
    try {
        const addressData = req.body;
        const Addresstabledata = {
            houseNo: addressData.houseNo,
            streetNo: addressData.streetNo,
            area: addressData.area,
            landmark: addressData.landmark,
            city: addressData.city,
            country: addressData.country,
            zipCode: addressData.zipCode,
            state: addressData.state,
            status: addressData.status,
            userId: req.user.user_id,
            addressType: addressData.addressType
        }

        const address = await Address.create(Addresstabledata);
        return address;
    }
    catch (error) {
        return error;
    };
}


const loginServices = async (req: Request, res: Response) => {
    try {
        const userdata = req.body;
        const email = userdata.email;
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return false;
        }
        else {
            const passmatch = await bcrypt.compare(userdata.password, user.password);
            if (!passmatch) {
                return false
            }
            else {
                const token = jwt.sign({ email: user.email, user_id: user.id, username: user.username }, process.env.secretKey, { expiresIn: '12h' });
                console.log(token);
                await maintain_session_control(res, user);
                return true;
            }
        }
    }
    catch (err) {
        return false;
    }
}

const forgetpassservice = async (req: Request) => {
    try{
        const isUser = User.findOne({where:{email:req.body.email}});
        console.log(isUser);
        if(isUser){
            const encryptPass = await bcrypt.hash(req.body.password, SALT);
            await User.update({password:encryptPass},{ where: {email:req.body.email} });
            return true;
        }
        else{
            return false;
        }
    }
    catch{
        return false;
    }
}

const logoutservice = async (req: Request) => {
    try {
        const isSession = await Session.findOne({ where: { username: req.user.username } });
        if (isSession) {
            if (isSession.status) {
                console.log(isSession)
                await Session.update({ status: !isSession.status }, { where: { id: isSession.id } });
                await distroySession(req.user);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
}

export { signupservice, addAddress, loginServices, logoutservice,forgetpassservice };

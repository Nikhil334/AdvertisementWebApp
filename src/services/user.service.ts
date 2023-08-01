import { User } from "../models/user.schema";
import { Session } from "../models/user.sessionschema";
import { Address } from "../models/user.addressschema";
import { maintain_session_control } from "../controllers/user.sessionController";
import { distroySession } from "../middleware/user.sessionredis";
import { save_otp,get_otp } from "../middleware/user.sessionredis";
import nodemailer from 'nodemailer';
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

// const forgetpassservice = async (req: Request) => {
//     try{
//         const isUser = User.findOne({where:{email:req.body.email}});
//         console.log(isUser);
//         if(isUser){
//             const encryptPass = await bcrypt.hash(req.body.password, SALT);
//             await User.update({password:encryptPass},{ where: {email:req.body.email} });
//             return true;
//         }
//         else{
//             return false;
//         }
//     }
//     catch{
//         return false;
//     }
// }

const forgetpassservice = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Email not found' });
        }

        let OTP = Math.floor(1000 + Math.random() * 9000);
        save_otp(email, OTP);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset Request',
            text: `You are receiving this email because you have requested a password reset for your account.\n\n RESET PASSWORD OTP: ${OTP}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Password reset link sent to email' });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}


const reset_password = async (req: any, res: any)=>{
    try {
        const { email, otp, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(400).json({ message: 'Email not found' });
        }
        const userOTP = await get_otp(email);
        console.log(userOTP);
        if (!userOTP ||  userOTP !== otp) {
            return res.status(401).json({ error: 'Invalid OTP' });
        }
        const encryptPass = await bcrypt.hash(newPassword,SALT);
        user.password = encryptPass;
        console.log(user.password);
        await user.save();
        return res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
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

const deleteUserById = async (id: string) => {
    return await User.destroy({ where: { id } });
  };
  
export { signupservice, addAddress, loginServices, logoutservice, forgetpassservice,reset_password,deleteUserById};

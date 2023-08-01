import { signupservice,loginServices,logoutservice,addAddress, forgetpassservice, reset_password,deleteUserById} from "../services/user.service";
import { Request, Response } from "express";
const signupController = async (req: Request, res: Response) => {
    try {
        const result = await signupservice(req);
        if (!result) {
            res.status(400).json({ error: 'Failed to insert user data' });
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to insert user data' });
    }
}

const addressaddController = async (req: Request, res: Response) => {
    try {
        const result = await addAddress(req);
        if (!result) {
            res.status(400).json({ error: 'Failed to insert user data' });
        }
        res.status(201).send(result);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to insert user data' });
    }
}

const loginController = async (req:Request,res:Response)=>{
    try {
        const result = await loginServices(req,res);
        if (!result) {
            res.status(400).send("user credentials are not valid");
        }
        res.status(201).send(`loggedIn : ${result}`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}

const forgetpasscontroller =async (req:Request,res:Response)=>{
    try {
        await forgetpassservice(req,res);
        // if (!result) {
            // res.status(400).send("invalid email");
        // }
        res.status(201).send(`otp sent successfully`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}

const resetpasscontroller =async (req:Request,res:Response)=>{
    try {
        await reset_password(req,res);
        // if (!result) {
            // res.status(400).send("invalid email");
        // }
        res.status(201).send(`password changed successfully`);
    }
    catch (error) {
        res.status(500).send("Internal Server error");
    }
}

const deleteUserController = async (req: Request, res: Response) => {
    try{
    const userid  = req.user.user_id;
      await deleteUserById(userid);
  
      return res.status(200).json({ message: 'User deleted'});
    } 
    catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

const logoutcontrol = async (req: Request, res: Response) => {
    try {
      const result = await logoutservice(req);
      if (!result) {
        res.status(404).json({ message: "User is already inactiv" })
      }
      else {
        res.status(201).json({ message: "User logOut Successfully" });
      }
    }
    catch (err) {
      res.status(500).json({ message: "Server Error" });
    }
  }
  

export {signupController,loginController,addressaddController,logoutcontrol,forgetpasscontroller,resetpasscontroller,deleteUserController};
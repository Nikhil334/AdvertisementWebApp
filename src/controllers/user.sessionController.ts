import { Request, Response } from "express";
import { maintain_session_service } from "../services/user.sessionservice";



const maintain_session_control = async (res:Response,user:any) => {
    try {
          const result = await maintain_session_service(user);
          if(!result){
            res.status(401).send("There is some problem to maintain session.")
          }
        }
    catch (err) {
        res.status(500).json({message: "Server Error", err});
        console.log("Server Error")
    }
}

export { maintain_session_control }    
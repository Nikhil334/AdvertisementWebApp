import express from 'express';
import { signupController,loginController,addressaddController, logoutcontrol,forgetpasscontroller, resetpasscontroller, deleteUserController} from '../controllers/user.controller';
import { checkRegisterData,checkLogindata } from '../middleware/user.datavalidation';
import { authenticateToken } from '../middleware/auth';
const userRoute = express.Router();


userRoute.route('/').get();
userRoute.route('/signup').post(checkRegisterData,signupController);
userRoute.route('/login').post(checkLogindata,loginController);
userRoute.route('/logout').post(authenticateToken,logoutcontrol);
userRoute.route('/forget').post(forgetpasscontroller);
userRoute.route('/addAddress').post(authenticateToken,addressaddController);
userRoute.route("/resetpass").post(resetpasscontroller);
userRoute.route('/delete').delete(authenticateToken,deleteUserController);


export default userRoute;
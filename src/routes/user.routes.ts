import express from 'express';
import { signupController,loginController,addressaddController, logoutcontrol,forgetpasscontroller} from '../controllers/user.controller';
import { checkRegisterData,checkLogindata } from '../middleware/user.datavalidation';
import { authenticateToken } from '../middleware/auth';
const userRoute = express.Router();


userRoute.route('/').get();
userRoute.route('/signup').post(checkRegisterData,signupController);
userRoute.route('/login').post(checkLogindata,loginController);
userRoute.route('/logout').post(authenticateToken,logoutcontrol);
userRoute.route('/forget').patch(forgetpasscontroller)
userRoute.route('/addAddress').post(authenticateToken,addressaddController);


export default userRoute;
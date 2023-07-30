import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getprofileController,setProfilepicController} from '../controllers/user.profileController';
import { upload } from '../middleware/multer.fileuploader';
const profileRoute = express.Router();


profileRoute.route('/').get();
profileRoute.route('/getProfile').get(authenticateToken,getprofileController);
profileRoute.route('/setpicture').post(authenticateToken,upload.single('photo'),setProfilepicController);

export default profileRoute;
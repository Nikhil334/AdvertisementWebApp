import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { addProductController, deleteproductController, getProductDetailsController, getbiddingController, setproductimagesController, updateProductController } from '../controllers/product.controller';
const productRoute = express.Router();
import { upload } from '../middleware/multer.fileuploader';

productRoute.route('/').get();
productRoute.route('/addproducts').post(authenticateToken,addProductController);
productRoute.route('/addimages/:pid').post(authenticateToken,upload.array('images',5),setproductimagesController);
productRoute.route('/deleteproduct/:id').get(authenticateToken,deleteproductController);
productRoute.route('/updateproduct/:pid').post(authenticateToken,updateProductController);
productRoute.route('/getdetails/:pid').get(authenticateToken,getProductDetailsController);
productRoute.route('/raisedbidding/:pid').post(authenticateToken,getbiddingController);

export default productRoute;
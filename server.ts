import express from "express";
import dotenv from 'dotenv';
import userRoute from "./src/routes/user.routes";
import { dbconnection } from "./src/config/conn";
import profileRoute from "./src/routes/user.updateprofile";
import categoryRoute from "./src/routes/product.category.routes";
import productRoute from "./src/routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
dbconnection();
app.use('/',userRoute);
app.use('/profile',profileRoute);
app.use('/',categoryRoute);
app.use('/products',productRoute);


app.listen(PORT,()=>{
  console.log(`I am listening at the port number ${PORT}`);
})
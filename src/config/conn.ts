const Sequelize = require('sequelize');
import dotenv from 'dotenv';
dotenv.config();


const sqlize = new Sequelize(process.env.dbName,process.env.userName,process.env.password,{
    host:process.env.host,
    dialect:process.env.dialect,
    pool:{
        max:10,
        min:0,
        aquire:3000,
        idle:10000
    }
  });

const dbconnection = async ()=>{
    try{
    const msgonconnect =  await sqlize.authenticate;
     console.log('Connection has been established successfully.');
   }
  catch(err){
    console.error('Unable to connect to the database:', err);
   }
}

export {sqlize,dbconnection};
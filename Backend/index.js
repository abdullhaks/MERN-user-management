import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/userRoutes.js';

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('database connected..')
})
.catch((error)=>{
    console.log(error);
})

const app = express();


app.listen (3000, ()=>{
    console.log('server is running on port NO 3000');
});

app.use('/api/user',userRouter)
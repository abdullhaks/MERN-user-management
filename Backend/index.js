import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/UserRoutes/userRoutes.js';
import authRouter from './Routes/UserRoutes/userAuthRoute.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('database connected..')
})
.catch((error)=>{
    console.log(error);
})

const app = express();

app.use(express.json());


app.listen (3000, ()=>{
    console.log('server is running on port NO 3000');
});

app.use('/api/profile',userRouter);
app.use('/api/auth',authRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
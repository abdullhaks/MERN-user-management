import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routes/UserRoutes/userRoutes.js';
import userAuthRouter from './Routes/UserRoutes/userAuthRoute.js';
import adminRouter from './Routes/AdminRoutes/adminAuthRoute.js'
import cookieParser from 'cookie-parser';


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
app.use(cookieParser());

app.listen (3000, ()=>{
    console.log('server is running on port NO 3000');
});

app.use('/api/profile',userRouter);
app.use('/api/auth',userAuthRouter);
app.use('/api/admin',adminRouter);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})
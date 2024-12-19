import User from "../../Models/UserModels/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../../Utils/error.js";
import jwt from 'jsonwebtoken';     


export const signup = async(req,res,next)=>{
    try{

        const {userName,email,password} = req.body;

        const hashedPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({userName,email,password:hashedPassword});
        
        await newUser.save();
        res.status(201).json({message:'user saved in database...'});
    }catch(error){
        next(error)
        console.log(error);
    }
};

export const signin = async(req,res,next)=>{
    try{

        const {email,password} = req.body;
        console.log('email and password is ',email,password);

        const validUser = await User.findOne({email});
        console.log('valid user is ',validUser);
        
        if(!validUser) return next(errorHandler(404,'User not found!'));
        const validPass = bcryptjs.compareSync(password,validUser.password);
        if(!validPass) return next(errorHandler(401,'Wrong credentials..!'));
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password : hashedPassword , ...rest} = validUser._doc;
        const expDate = new Date(Date.now()+3600000);


        res.cookie ('access_token',token, {httpOnly:true , expires:expDate}).status(200).json(rest);

    }catch(error){
        next(error);
        console.log(error);
    }
};

export const google = async(req,res,next) => {
    try{

        console.log('body data from back end is ',req.body);

        const user = await User.findOne({email:req.body.email});

         console.log('user backend is ',user);

        if(user){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            const {password : hashedPassword , ...rest} = user._doc;
            const expDate = new Date(Date.now()+3600000);
    
    
            res.cookie ('access_token',token, {httpOnly:true , expires:expDate}).status(200).json(rest);

        }else{
            const autoPass = Math.random().toString(36).
            slice(-8) + Math.random().toString(36).
            slice(-8);

            const hashedPassword = bcryptjs.hashSync(autoPass,10);

            const newUser = new User({
                userName:req.body.name.split(' ')
                .join('')
                .toLowerCase()
                +Math.floor(Math.random() * 10000 )
                .toString(),

                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo});
            
            await newUser.save();

            const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
            const {password : hashedPassword2 , ...rest} = newUser._doc;
            const expDate = new Date(Date.now()+3600000);
    
    
            res.cookie ('access_token',token, {httpOnly:true , expires:expDate}).status(200).json(rest);

        }

    }catch(error){
        next(error);
    }
}
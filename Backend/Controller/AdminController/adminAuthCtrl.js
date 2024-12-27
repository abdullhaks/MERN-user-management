import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../../Utils/error.js";
import User from "../../Models/UserModels/userModel.js";

export const adminSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        console.log('admin email and password is :',email,password);
        
        const validAdmin = await User.findOne({ email });
        if (!validAdmin) return next(errorHandler(404, "Admin not found!"));

        
        const validPass = bcryptjs.compareSync(password, validAdmin.password);
        if (!validPass) return next(errorHandler(401, "Wrong credentials..!"));

        
        if (!validAdmin.isAdmin) return next(errorHandler(403, "Access denied! Not an admin."));

        
        const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

       
        const { password: hashedPassword, isAdmin, ...rest } = validAdmin._doc;

        const expDate = new Date(Date.now() + 3600000); 

        res.cookie("adminAccess_token", token, { httpOnly: true, expires: expDate })
            .status(200)
            .json({ success: true, ...rest });

    } catch (error) {
        next(error);
        console.error(error);
    }
};


export const adminsignOut = async (req, res, next) => {
    try {
      // here we clear auth admin cookie...........
      res
        .clearCookie("adminAccess_token", { httpOnly: true })
        .status(200)
        .json({ message: "Signed out successfully." });
    } catch (error) {
      next(error);
    }
  };

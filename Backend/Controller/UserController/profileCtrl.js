import User from "../../Models/UserModels/userModel.js";

export const updateProfile = async (req, res, next) => {
  try {
    const { userName, email, profilePicture } = req.body;

    console.log('user credential from backend is..',userName, email, profilePicture);

    if(profilePicture){
      var updatedUser = await User.updateOne(
        { email: email }, 
        { $set: { userName, email, profilePicture } } 
      );
    }else{
      var updatedUser = await User.updateOne(
        { email: email }, 
        { $set: { userName, email } } 
      );
    }
  
    if (updatedUser.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or no changes made." });
    }

    const validUser = await User.findOne({email});

    const {password : hashedPassword , ...rest} = validUser._doc;
    res.status(200).json(rest);

  } catch (error) {
    next(error);
  }
};


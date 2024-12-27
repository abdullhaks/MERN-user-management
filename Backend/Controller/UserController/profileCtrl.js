import User from "../../Models/UserModels/userModel.js";
import bcryptjs from "bcryptjs";

export const updateProfile = async (req, res, next) => {
  try {
    const { userName, email, profilePicture, password, _id } = req.body;

    console.log("User credentials from backend are:", userName, email, profilePicture);

    const updatedFields = { userName, email };

    // Check dp
    if (profilePicture) {
      updatedFields.profilePicture = profilePicture;
    }

    if (password) {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      updatedFields.password = hashedPassword; 
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, {
      new: true, 
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found or no changes made." });
    }

    const { password: hashedPassword, ...rest } = updatedUser._doc;
    res.status(200).json(rest); 
  } catch (error) {
    next(error); 
    console.error(error); 
  }
};


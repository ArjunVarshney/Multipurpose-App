import User from "../Models/UserModel.js";

// create a new user
export const createUser = async (req, res) => {
  try {
    const userData = req.userData;
    const isUserPresent = await User.findOne({ email: userData.email });
    if (isUserPresent) {
      res.status(200).json({
        success: true,
        data: isUserPresent,
      });
      return;
    }
    const newUser = new User(userData);
    const fullData = await newUser.save();

    if (!fullData) {
      res.status(400).json({
        success: false,
        data: "Cannot track Signin status",
      });
    }

    res.status(200).json({
      success: true,
      data: fullData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      reason: err,
    });
  }
};

//get a single user
export const getUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const targetUser = await User.findById(id);
    if (!targetUser) {
      res.status(400).json({
        success: false,
        reason: "invalid user",
      });
    }
    res.status(200).json({
      success: true,
      data: targetUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

//update the data of the user
export const updateUser = async (req, res) => {
  try {
    const id = req.params["id"];
    if (!id) {
      res.status(400).json({
        success: false,
        reason: "User not found",
      });
    }
    if (req.params["id"] != req.user_id) {
      res.status(400).json({
        success: false,
        reason: "User editing is not same as the user itself",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });

    if (!updateUser) {
      res.status(400).json({
        success: false,
        data: "Updated user not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

export const savePost = async (req, res) => {
  try {
    const id = req.params["id"];
    const post_id = req.body.post_id;
    if (!post_id || !id) {
      res.status(400).json({
        success: false,
        reason: "User id or the post id is missing",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { saved: post_id } },
      {
        returnDocument: "after",
      }
    );
    if (!updateUser) {
      res.status(400).json({
        success: false,
        data: "Updated user not found",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

//Delete a single user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const deletedData = await User.findByIdAndDelete(id, { rawResult: true });
    if (!deleteUser) {
      res.status(400).json({
        success: false,
        data: "Cannot track delete status",
      });
    }
    res.status(200).json({
      success: true,
      data: deletedData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

// Get all users for test
export const getAllUser = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ success: true, data: allUsers });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

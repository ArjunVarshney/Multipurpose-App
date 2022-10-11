import User from "../Models/UserModel.js";

// create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const fullData = await newUser.save();
    res.status(200).json({
      success: true,
      data: fullData,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      reason: "Error occured while saving data",
    });
  }
};

//get a single user
export const getUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const targetUser = await User.findOne({ _id: id });
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
      reason: "Error occured while finding the user",
    });
  }
};

//update the data of the user
export const updateUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const updatedUser = await User.updateOne({ _id: id }, req.body);
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {}
};

//Delete a single user
export const deleteUser = async (req, res) => {
  try {
    const id = req.params["id"];
    const deletedData = await User.deleteOne({ _id: id });
    res.status(200).json({
      success: true,
      data: deletedData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: "Error while deleting the user from the database",
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
      reason: "Failed to get all users from the database",
    });
  }
};

import { OAuth2Client } from "google-auth-library";
import User from "../Models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();
const client_id = process.env.GOOGLE_CLIENT_ID;

const client = new OAuth2Client(client_id);

let verify = async (token) => {
  if (!token) return;
  const user = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  });
  return user;
};

export const authorize = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({
      success: false,
      reason: "Token not found",
    });
    return;
  }
  try {
    const result = await verify(token);
    
    if (!result) {
      res.status(400).json({
        success: false,
        reason: "The email is not found",
      });
      return;
    }
    const payload = result.getPayload();

    const user = await User.findOne({ email: payload.email });
    if (!user) {
      res.status(400).json({
        success: false,
        reason: "User not signed in",
      });
      return;
    }
    req.user_id = user._id;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: "Some error occurred",
    });
  }
};

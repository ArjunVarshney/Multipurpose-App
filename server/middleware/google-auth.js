import { OAuth2Client } from "google-auth-library";
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

export const verify_google_user = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    res.status(400).json({
      success: false,
      reason: "Token not found",
    });
  }
  const result = await verify(token);
  if (!result) {
    res.status(400).json({
      success: "false",
      reason: "The email is not found",
    });
  }
  const payload = result.getPayload();
  const requiredData = {
    name: payload.name,
    email: payload.email,
    image_url: payload.picture,
  };
  req.userData = requiredData;
  next();
};

verify().catch(console.error);

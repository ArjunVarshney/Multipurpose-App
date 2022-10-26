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
  try {
    const result = await verify(token);
    // const result = await verify(
    //   "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMWI5Zjg4Y2ZlMzE1MWRkZDI4NGE2MWJmOGNlY2Y2NTliMTMwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NjY3NDc0MzgsImF1ZCI6IjYwMTQyMTk0MjQ4OC1zMWQzcWthOWdiYTE3aDc5YXJ1N3A4ZnFtYWFmamZvdS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwMjYyMDMzNzE5ODQ3OTI3NTgzMCIsImVtYWlsIjoidmFyc2huZXlhcmp1bjQ5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiI2MDE0MjE5NDI0ODgtczFkM3FrYTlnYmExN2g3OWFydTdwOGZxbWFhZmpmb3UuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiQXJqdW4gVmFyc2huZXkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1M3Ntak92YUtxYUd4QkhCWDRjUVJSTmxXQjBBTFRMOEJ0TlFpdXVOZz1zOTYtYyIsImdpdmVuX25hbWUiOiJBcmp1biIsImZhbWlseV9uYW1lIjoiVmFyc2huZXkiLCJpYXQiOjE2NjY3NDc3MzgsImV4cCI6MTY2Njc1MTMzOCwianRpIjoiMWFiYWNlNmUwOGE3OThjNDI1OGFmOTIwNzc3MDVjOTNkMzc4Zjc5YiJ9.USANMOLYpzl82APRJRw8ueYPbPmtNHQYJzVDShQpZiZesCT_iYDUFvgUnyRHxaEqtZJQadqDtG_LSkMAE8f3bvd7D8vcDUdBcJMX-b5dgQ0t-AbpQqFQn1rz-X2vDuFIu6Mr-0EoM2vTZ2CBK5MZOHMcBhskCREjmjYHX_bX_PDo09HtJsyNjBL4hy07yMc7IPd5BbqyD1NhzusSPKjoWnOVoBcepGDvA0bcREwvGe3xMUyaM9IvupZcAgXMEicY1lm9OilF68GGyPcuS8ItZa3CRzFDiBvS_fAYo5u7VYH-yqJYwJYRq87YlMzf4Rdw6eqQzAM9mBM8gak8uYapAw"
    // );
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
  } catch (error) {
    res.status(400).json({
      success: false,
      reason: error,
    });
  }
};

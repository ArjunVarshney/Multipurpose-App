import mongoose from "mongoose";

const makeConnection = async (username, password, uri, port) => {
  const mongoURL = `mongodb://${username}:${password}@${uri}:${port}/?authSource=admin`;
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log("Connected to database successfully");
  } catch (err) {
    console.log(err, mongoURL);
    setTimeout(() => Connect(username, password, uri, port), 5000);
  }
};

export default makeConnection;

import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    console.log("connected to the db");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  //we are passing the reference of the function
  .catch(console.error);

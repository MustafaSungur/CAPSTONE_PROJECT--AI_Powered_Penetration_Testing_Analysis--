import mongoose from "mongoose";

const conn = () => {
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to the DB saccessfully");
    })
    .catch((err) => console.log(`DB coonection err: ${err}`));
};

export default conn;

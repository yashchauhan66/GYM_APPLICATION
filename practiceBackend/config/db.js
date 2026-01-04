import mongoose from "mongoose";

const mongooUrl =
  "mongodb+srv://yashchauhan6660_db_user:Hanuman123@cluster0.8qvsrya.mongodb.net/?appName=Cluster0";

 function connectDB() {
  mongoose
    .connect(mongooUrl)
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("DB error", error);
    });
}

export default connectDB;
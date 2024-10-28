const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI, { dbName: "JobPortal" })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Some error occured", err));

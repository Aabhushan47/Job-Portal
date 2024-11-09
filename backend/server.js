const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./db/db");

const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "https://job-portal-5rrw.vercel.app",
  })
);

//import routes
const userRoute = require("./routes/userRoutes");
const jobRoute = require("./routes/jobRoutes");
const applicationRoute = require("./routes/applicationRoutes");

//routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoute);
app.use("/api", jobRoute);
app.use("/api", applicationRoute);

//start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

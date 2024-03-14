const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port  = process.env.PORT || 8000;

dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, () => {
  console.log("CONNECTED TO MONGO DB")
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan("common"));

app.get("/v1/", (req, res) => {
  res.send("Hello World")
});
app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);

app.listen(port, ()=> {
    console.log(`Server is running in PORT ${port}!`)
});
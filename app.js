require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const { connectDB } = require("./db/connection");
const Routes = require("./src/routes/router");
const Book = require("./src/routes/task");
const Auth = require("./src/routes/Auth");

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Routes);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Task-Tracker",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at the port ${PORT}`);
});


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(
  fileupload({
    useTempFiles: true,
  })
);

// routers
app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/catagoryRoutes"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRoute"));
app.use("/api", require("./routes/paymentRoute"));
// middleware
app.use(auth);

// database connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .on("error", (err) => {
    console.log("Connection failed...");
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));

// 2.06.10

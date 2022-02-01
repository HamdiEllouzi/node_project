const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");
const conversationRouter = require("./routes/conversation");
const messageRouter = require("./routes/message");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || "8000";
const dbUrl = process.env.ATLAS_URI;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("connect");
  const messageCollection = db.collection("messages");
  const ChangeStream = messageCollection.watch();

  // ChangeStream.on("change", (change) => {
  //   console.log(change);
  // });
});

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversation", conversationRouter);
app.listen(port, () => {
  console.log(`listen to port at ${port}`);
});

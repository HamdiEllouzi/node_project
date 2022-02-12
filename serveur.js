const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

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
app.use(cors());
//web soket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
let users = [];
const addUsers = (userId, socketId, userData) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId, userData });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUser", (userId, userData) => {
    addUsers(userId, socket.id, userData);
    io.emit("listOfUsers", users);
  });

  socket.on("sendMessage", (data, reciverId) => {
    const user = getUser(reciverId);
    user && io.to(user.socketId).emit("getMessage", data);
  });

  socket.on("newRome", (rome, reciverId) => {
    const user = getUser(reciverId);
    user && io.to(user.socketId).emit("getRome", rome);
  });

  socket.on("onDeleteRome", (rome, reciverId) => {
    const user = getUser(reciverId);
    user && io.to(user.socketId).emit("romeDeleted", rome);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("listOfUsers", users);
  });
});

mongoose
  .connect(process.env.MONGODB_URL || dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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

  ChangeStream.on("change", (change) => {
    console.log(change);
  });
});

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/messages", messageRouter);
app.use("/api/conversation", conversationRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
}

server.listen(port, () => {
  console.log(`listen to port at ${port}`);
});

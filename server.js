const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const formatMessage = require("./utils/messages");
const mongoose = require("mongoose");
const port = process.env.PORT || 3434;

const User = require("./utils/users");

// set static folder
const app = express();
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
const io = socketIO(server);
const adminChat = "Admin";

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://fall2022_comp3123:SAFA.aru1993@cluster0.lclqo7i.mongodb.net/comp3123_lab_test1?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  let username = "";
  // Connection of username with room using mongo db database
  socket.on("joinRoom", ({ username:joinUsername, room }) => {
    socket.join(room);
    username = joinUsername;
    User.findOne({ username: username }, (err, user) => {
      if (err) return console.error(err);
      if (!user) {
        const newUser = new User({
          username: username._id,
          firstName: "",
          lastName: "",
          password: "",
        });
        newUser.save((err) => {
          if (err) return console.error(err);
        });
      }
      // Emit a welcome message to the connected client
      socket.emit(
        "message",
        formatMessage(adminChat, "Welcome to the chat app")
      );

      // Broadcast a message to all connected clients when a new user joins
      socket.broadcast.emit(
        "message",
        formatMessage(adminChat, "New user joined")
      );
    });
  });

  // Listen for the 'chatMessage' event and broadcast it to all connected clients
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage(username, msg));
  });

  // Listen for the 'disconnect' event and broadcast a message to all connected clients when a user leaves
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(adminChat, "A user has left"));
  });
});

// Listen for server


server.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

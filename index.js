const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"]
  }
});

const updateData = (socket) => {
  socket.emit('update_data', Array.from({length: 5}, () => Math.floor(Math.random() * 100)))

  setTimeout(() => {
    updateData(socket);
  }, 5000);
}

io.on("connection", (socket) => {
  console.log("Socket connected");
  updateData(socket);

  socket.on("disconnect",  () => {
    console.log("Socket disconnected");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running ${PORT}`))
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  addTrailingSlash: false,
  cors: {
    origins: [process.env.REACT_APP_CLIENT_URL],
  },
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST",
    });
    res.end();
  },
});

// Use CORS middleware for HTTP requests
app.use(
  cors({
    origin: process.env.REACT_APP_CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Define routes
app.get("/", (req, res) => {
  res.send("Running");
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define routes
app.use("/api", require("./routes/User"));
app.use("/api", require("./routes/Mocktest"));
app.use("/api", require("./routes/Subject"));
app.use("/api", require("./routes/Course"));
app.use("/api", require("./routes/University"));
app.use("/api", require("./routes/College"));
app.use("/api", require("./routes/Review"));
app.use("/api", require("./routes/Others"));
app.use("/api", require("./routes/Payment"));
app.use("/api", require("./routes/Meeting"));

// Start the server
const PORT = process.env.PORT || 1447;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

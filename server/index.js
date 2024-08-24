require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const loginRegister = require("./routes/User");
const createQuestion = require("./routes/Mocktest");
const subject = require("./routes/Subject");
const course = require("./routes/Course");
const university = require("./routes/University");
const college = require("./routes/College");
const review = require("./routes/Review");
const others = require("./routes/Others");
const payment = require("./routes/Payment");
const meeting = require("./routes/Meeting");

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

const server = require("http").createServer(app);
const corsOptions = {
  origin: process.env.REACT_APP_CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true,
    };
    res.writeHead(200, headers);
    res.end();
  },
});

io.on("connection", (socket) => {
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
});

app.get("/", (req, res) => {
  res.send("Running");
});
//convert body to json
app.use(express.json());

mongoose.connect(process.env.mongo_URI, {
  useNewUrlParser: true,
});

//for the login and register api
app.use("/api", loginRegister);

// for the mock test
app.use("/api", createQuestion);

// for the subject
app.use("/api", subject);

// for the course
app.use("/api", course);

// for the university
app.use("/api", university);

// for the college
app.use("/api", college);

// for others
app.use("/api", others);

// for review
app.use("/api", review);

// forpayment
app.use("/api", payment);

// for meeting
app.use("/api", meeting);

server.listen(1447, () => {
  console.log("Server started on 1447");
});

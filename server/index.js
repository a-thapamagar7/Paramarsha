const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const loginRegister = require("./routes/LoginRegister")

//allows communication between ports
app.use(cors())
//convert body to json
app.use(express.json())

mongoose.connect("mongodb+srv://ayush:ayush@cluster0.kkcnx41.mongodb.net/test", {
    useNewUrlParser: true,
})

//for the login and register api
app.use("/api", loginRegister)

app.get('/', (req, res) => {
    res.send('Running');
});

app.listen(1447, () => {
    console.log('Server started on 1447')
})

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    socket.emit("me", socket.id)

    socket.on("disconnect", () => {
        socket.brodcast.emit("callended")
    })

    socket.on("calluser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("calluser", { signal: signalData, from, name })
    })

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal)
    })
})
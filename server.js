const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const {Server} = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET" , "POST"],
    },
});

io.on("connection", (socket) => {

    socket.on("join_room", (data)=>{
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on("disconnect" , ()=>{
    })
})

server.listen(3002, () => {
    console.log("Server Started on PORT:3002")
})
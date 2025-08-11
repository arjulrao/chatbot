require('dotenv').config();
// const { text } = require('stream/consumers');
const app = require('./src/app');
const generateResponse = require("./src/service/ai.service")

const {createServer} = require('http');
const {Server} = require('socket.io')

const httpServer = createServer(app);
const io = new Server(httpServer);

const chatHistory = [

]

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("disconnect", () =>{
    console.log("user disconnected.")
  })

  socket.on("message", async(data) => {
    chatHistory.push({
        role : "user",
        parts : [{
            text : data
        }]
    })

    const response = await generateResponse(chatHistory)

    chatHistory.push({
        role : "model",
        parts : [{
            text : response
        }]
    })

    socket.emit("response", response)

  })

});

httpServer.listen(3000, ()=> {
    console.log("server is live at port 3000.")
});
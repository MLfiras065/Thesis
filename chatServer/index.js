const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server,{
    perMessageDeflate: {
      threshold: 2048, 
  
      zlibDeflateOptions: {
        chunkSize: 8 * 1024, 
      },
  
      zlibInflateOptions: {
        windowBits: 14,
        memLevel: 7, 
      },
  
      clientNoContextTakeover: true, 
      serverNoContextTakeover: true, 
      serverMaxWindowBits: 10, 
  
      concurrencyLimit: 20, 
    }
})
console.log("yoo")
chatRooms=[]
io.on("connection", (socket) => {
    console.log(`1 ${socket.id}`);
    console.log('test');
    socket.on("createRoom", (roomName) => {
      socket.join(roomName);
      chatRooms.unshift({ id:socket.id, roomName, messages: [] });
      socket.emit("roomsList", chatRooms);
    console.log(chatRooms,"chatrooms");
    });
    socket.on("send-message", (data) => {
      console.log("data",data)
      if(data!==undefined){
      chatRooms[0].messages.push(data)
      socket.broadcast.emit("send-message",chatRooms)
      console.log(chatRooms)
    
    }
    });
    socket.on("disconnect", () => {
        console.log("User Disconnected", chatRooms);
        socket.disconnect()
        // io.emit("get-users", chatRooms);
    });
  });
app.get("/api", (req, res) => {
  res.json({data});
});
server.listen(3000, () => {
    console.log('Server started - http://localhost:3000');
  })
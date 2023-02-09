console.log("Starting The Server....");

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { mouse, Point ,screen} = require("@nut-tree/nut-js");

// const ngrok = require('ngrok');
// async function publicServer() {
//   const url = await ngrok.connect({ 
//     addr: 3000,
//     authtoken : "2G2HmNISVme712B7GWPAfUyZo28_7h7YxBCmWYZ6RnVYHqYr3",

//   });
//   console.log(url);
// }
app.use("/public",express.static("public"))


app.get('/', (req, res) => {
  res.sendFile(process.cwd()+ '/view/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("mouse_movement", async (data) => {
        MouseMovement(data)
    })
    socket.on("mouse_click", async (data) => {
      MouseClick(data)
    })
    socket.on("log", async (data) => {
      console.log(data);
    })
});

server.listen(3000,() => {
  console.log('listening on http://localhost:3000');

});

async function MouseMovement(data) {
  const { x, y} = data
  await mouse.setPosition((new Point((x / 100 ) * await screen.width(), (y / 100 ) * await screen.height() )))
}
async function MouseClick() {
  mouse.leftClick()
}


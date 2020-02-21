if(process.env.NODE_ENV == "development"){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

// const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));
// var io = require('socket.io')(server);

server.listen(port, ()=>{
    console.log('connected');
});
// WARNING: app.listen(80) will NOT work here!

var cors = require('cors')
app.use(cors())

app.get('/', function (req, res) {
  // res.send(images);
  res.status(200).json('masup kang')});



io.on('connection', function (socket) {
  // console.log('connected nih');
  app.use('/', function (req, res, next) {
    req.socket = socket
    req.io = io
    next()
  });
  
  app.use(routes)
  app.use('/', errorHandler)

  })



// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

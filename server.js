// var socket = require('socket.io');
// var express = require('express');
// const port = process.env.PORT || 5000;
// const bodyParser = require('body-parser');
//
// var app = express()
// var server = app.listen(port, function() {
//   console.log("Listening port:", port);
// })
//
// var io = require('socket.io').listen(server);
//
// app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header(
//      'Access-Control-Allow-Headers',
//      'Origin, X-Requested-With, Content-Type, Accept'
//    );
//    next();
// });
//
// app.use(express.static('public'))
//
// io.on('connection', function (socket) {
//   console.log("Socket connection made")
// });


require('dotenv').config();
 const express = require('express');
 var MongoClient = require('mongodb').MongoClient;
 const bodyParser = require('body-parser');
 const Pusher = require('pusher');
 var socket = require('socket.io');
 const app = express();
 var server = require('http').createServer(app);
 const port = process.env.PORT || 4000;
 const pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'eu',
 });

 server.listen(port, function() {
   console.log("Listening port:", port);
 });

 var serverIO = app.listen(5000, function() {
   console.log("Port also connected at:", 5000);
 })

 var io = socket(serverIO);

 io.sockets.on('connection', function (socket) {
   console.log("Socket connection made");
   socket.on("messageAdded", (newMessage) => {
     var mongodb_uri = "mongodb://"+process.env.db_user+":"+process.env.db_pass+".mlab.com:31729/fast-draw";
     MongoClient.connect(mongodb_uri, function(err, db) {
        if(err) {
          console.log("connection failed: "+err);
          return;
        }
        var fd_db = db.db("fast-draw");
        fd_db.collection("messages").find({}).toArray(function(err, res) {
          var isUnique = true;
          for(var index = 0; index < res.length; index++) {
            if (newMessage._id === res[index]._id) {
              isUnique = false;
              fd_db.collection("messages").deleteOne(res[index], function(err, obj) {
                if (err) throw err;
              })
            }
          }
            if (isUnique) {
              fd_db.collection("messages").insertOne(newMessage, function(err, result) {
                if (err) throw err;
                // socket.emit('chatLoad', res);
                console.log("Res is: ", [...res, newMessage])
                db.close();
              });
            }
        })
      });
   });
   socket.on('chatInit', () => {
     console.log("A chat has been initialized...");
     var mongodb_uri = "mongodb://"+process.env.db_user+":"+process.env.db_pass+".mlab.com:31729/fast-draw";
     MongoClient.connect(mongodb_uri, function(err, db) {
        if(err) {
          console.log("connection failed: "+err);
          return;
        }
        var fd_db = db.db("fast-draw");
        fd_db.collection("messages").find({}).toArray(function(err, res) {
          if (err) throw err;
          console.log("HISTORY: ",res);
          socket.emit('chatLoad', res);
          db.close();
        });
      });
   })

 });

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: false}));
 app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
     'Access-Control-Allow-Headers',
     'Origin, X-Requested-With, Content-Type, Accept'
   );
   next();
 });

 app.post('/paint', (req, res) => {
       pusher.trigger('painting', 'draw', req.body);
       res.json(req.body);
     });

app.get('/paint', (req, res) => {
  res.send("Up and running!")
})

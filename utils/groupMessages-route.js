const privateMessage = require('../models/group_models');
const express = require('express');
const http = require("http");
const app = express();
const Router = express.Router();

app.get('/room', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.get('/groupMessages', (req, res) => {
    GroupMessage.find({},(err, messages)=> {
        console.log(messages)
      res.send(messages);
    })
  })

app.post('/groupMessages', (req, res) => {
    console.log(req.body)
        const msg = {
            from_user: req.body.username,
            room: req.body.room,
            message: req.body.message
        }
    var message = new GroupMessage(msg);
    message.save((err) =>{ 
      if(err)
      {
        console.log(err)
      }
    })
})

module.exports = Router;
"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nameRouter = express.Router();

const redisServer = require("./io-redis-ex");
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(cors());

app.use("/name", nameRouter);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



nameRouter.get("/", async (req, res) => {
  const data = await redisServer.getName();
  console.log("get /name", data);
  const toSend = {
      "message": `Hello World ${data}`
    }
  res.send(toSend);
});

nameRouter.post("/", async (req, res) => {
    const message = req.body.message;
    console.log("post /name", message);
    await redisServer.setName(message);
    res.send('ok');
  });
  
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

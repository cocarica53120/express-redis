"use strict";
const express = require("express");
const cors = require("cors");

const redisData = require("./io-redis-ex");
// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const data = await redisData.getName();
  console.log("get /", data);
  const toSend = {
      "message": `Hello World ${data}`
    }
  res.send(toSend);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

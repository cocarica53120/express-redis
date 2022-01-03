"use strict";

const Redis = require("ioredis");
const redis = new Redis({
  host: "localhost",
  port: 6379,
});



const getName = () => {
  return new Promise((res, rej) => {
    redis.get("name", (err, reply) => {
      if (err) {
        rej(err);
        throw err;
      } else {
        console.log(reply);
        res(reply);
      }
    });
  });
};


const setName = (data) => {
    return new Promise((res, rej) => {
      redis.set("name", data, (err, reply) => {
        if (err) {
          rej(err);
          throw err;
        } else {
          console.log(reply);
          res(reply);
        }
      });
    });
  };

getName()
  .then((data) => console.log("getName data is", data))
  .catch((e) => console.error("catched", e));

redis.set("name", "Toto", (err, reply) => {
  if (err) throw err;
  console.log(reply);
});
redis.get("name", (err, reply) => {
  if (err) throw err;
  console.log(reply);
});

// redis.quit();


module.exports = {
  getName,
  setName,
};

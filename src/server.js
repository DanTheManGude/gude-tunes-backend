import { revision } from "./utils.js";

import express from "express";
import cors from "cors";
import readline from "readline";

const PORT = process.env.PORT || 3030;

const server = express();
server.use(cors());

server.get("/ping", (req, res) => {
  res.send("pong");
});

server.get("/revision", (req, res) => {
  res.send(revision());
});

server.use((err, req, res, next) => {
  var statusCode = err.status || 500;
  res.end(res.writeHead(statusCode, err.message));
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (str, key) => {
    if (key.name === "q") {
      console.log("Goodbye!");
      process.exit();
    }
  });
  console.log("Press 'q' to quit");
});

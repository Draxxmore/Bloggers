const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./src/api/routes");
const server = express();
const PORT = 4000;

server.listen(PORT, console.log(`API server listening on port ${PORT}`));

const whitelist = ["http://localhost:3000", "https://bloggers-ui.herokuapp.com/"];

server.use(
  cors({
    credentials: true,
    origin: () => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

server.use(express.json());
server.use(cookieParser());
server.use("/api", routes);

server.get("/", (request, response) => response.status(200).send("API is working"));

server.get("/api", (request, response) => {
  response.status(200).send("/api is working too!");
});

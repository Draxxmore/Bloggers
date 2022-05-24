const express = require("express");
const server = express();
// const routes = require("./src/api/routes");
const PORT = 4000;

server.listen(PORT, console.log(`API server listening on port ${PORT}`));

server.get("/", (request, response) =>
  response.status(200).send("API is working")
);

// server.use("/api", routes);

// module.exports = server;

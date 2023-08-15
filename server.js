//Our main app file. Here, we set up the configuation for running the app, pulling in all other bundled files and designating "PORT 3001" for monitoring the content of our database.
const express = require("express");
const routes = require("./routes");

const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});

require("dotenv").config();

const express = require("express");
const app = express();

const path = require("path");

app.get("/login", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/login.html`));
});

app.use("/", (req, res) => {
  res.status(200).send("<h1>HELLO!</h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

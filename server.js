require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const jwtKey = "MY_SECRET_JWT_KEY";
const jwtExpiry = 6000;

const path = require("path");

const users = {
  user1: "password1",
  user2: "password2",
};

const logIn = (req, res) => {
  const { username, password } = req.body;

  console.log(`Received request, username: ${username}, password: ${password}`);
  if (!username || !password || users[username] !== password) {
    // return 401 error is username or password doesn't exist, or if password does
    // not match the password in our records
    console.log("bad login attempt");
    return res.status(400).json({
      ok: false,
      status: 400,
      message: "Login failed. Please check username & password",
    });
  }

  const token = jwt.sign(
    {
      username,
    },
    jwtKey,
    {
      algorithm: "HS256",
      expiresIn: jwtExpiry,
    }
  );

  res.status(201).json({
    ok: true,
    data: {
      username,
      token,
    },
    message: "Login successful! Redirecting now.",
  });
};

app.get("/api/login", (req, res) => {
  console.log("get request received!");
  res.status(200).json("You did send a get a request!");
});

app.post(
  "/api/login",
  (req, res) => logIn(req, res)
  // {
  //   console.log("got request!" + JSON.stringify(req.body));
  //   res.status(200).json("You did get a request!");
  // }
);

app.use("/", (req, res) => {
  res.status(200).send("<h1>HELLO!</h1>");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`App listening on port ${process.env.PORT}`);
});

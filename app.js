"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const questionsRouter = require("./api/questions"); //current directory
const categoriesRouter = require("./api/categories");
const usersRouter = require("./api/users");
const startDatabase = require("./services/databaseService");
const express = require("express"); //returns function from node module "express"
const app = express();
const path = require("path");
startDatabase();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use("/api", questionsRouter, categoriesRouter, usersRouter); // /api/questions etc
let myName = "brian";
let age = 1;
console.log(myName);
app.listen(3002, () => {
    console.log("server running on port 3002");
});
const staticDirectory = path.join(__dirname, "static");
app.use(express.static(staticDirectory));
app.get("*", (request, response) => {
    response.sendFile(path.join(staticDirectory, "index.html"));
});

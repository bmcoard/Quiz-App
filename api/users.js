const express = require("express")
const usersRouter = express.Router()
const {verifyUser} = require("../middlewares/user") //destructure
const User = require("../models/user")


usersRouter.post("/users", express.json(), verifyUser, async (req, res) => {
    console.log("endpoint hit")
    const newUser = new User({
        userId: Math.floor(Date.now())/1000, //epoch 
        username: req.body.username
    })
    
    await newUser.save()
    res.sendStatus(200) //sets status and sends it to client
    //res.status sets status and results in a pending response
})

module.exports = usersRouter  //exports router to app.js
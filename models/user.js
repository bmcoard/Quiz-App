const mongoose = require("mongoose")

const {Schema} = mongoose
const userSchema = new Schema({    //schema object
    userId: {type: Number}, // defines properties of field userId
    username: {type: String}
})

const User = mongoose.model("User", userSchema)  //User is the name of the table

module.exports = User 
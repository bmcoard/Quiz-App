const categories = [
    {
        category: "geography",
        tags: [ "climate", "countries", "states", "cities", "capitals" ],
    },
    {
        category: "food",
        tags: [ "cuisines", "cutlery", "fine-dining" ],
    }
]

const express = require("express")
const categoriesRouter = express.Router()
const {verifyUser} = require("../middlewares/user") //destructure


categoriesRouter.get("/categories", verifyUser, (request, response) => response.status(200).json(categories))

categoriesRouter.post("/categories", express.json(), verifyUser, async (req, res) => {   //middleware: express.json() converts stringified body into json format
    const category = req.body
    categories.push(category)
    res.status(201).json(categories)
})

module.exports = categoriesRouter  //exports router to app.js

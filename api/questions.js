const number = null
const quizQs =[
    {
        question: "what is the Windows operating system?",
        optA: "What runs on my comp",
        optB: "favorite color",
        optC: "favorite food",
        optD: "worst enemy",
        correct: "A"
    },

    {
        question: "what is the color of the sun?",
        optA: "red",
        optB: "blue",
        optC: "yellow",
        optD: "white",
        correct: "D"
    },

    {
        question: "what is 1 divided by 0?",
        optA: "1",
        optB: "0",
        optC: "Undefined",
        optD: "2",
        correct: "C"
    }
]

const express = require("express")
const questionsRouter = express.Router()
const {verifyUser} = require("../middlewares/user") //destructure

questionsRouter.get("/questions", verifyUser, (request, response) => {
    
    if(number != null){
        
        if(number >= quizQs.length){
            response.status(404).json({error: "Number exceeds total amount of quiz questions"})
        }
        
        
        else if(number < 0){
            response.status(404).json({error: "Number is less than zero"})
        }

        else{
            response.status(200).json(quizQs[number])
        }
    }

    else{
        response.status(200).json(quizQs)
    }

})


questionsRouter.post("/questions", express.json(), verifyUser, async (req, res) => {
    const question = req.body
    quizQs.push(question)
    res.status(201).json(quizQs)
})

module.exports = questionsRouter
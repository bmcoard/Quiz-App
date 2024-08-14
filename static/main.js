let quizQs = []
let currentQ_index = 0

let getA = document.getElementById("A")
let getB = document.getElementById("B")
let getC = document.getElementById("C")
let getD = document.getElementById("D")
let options = document.getElementsByClassName("option")
let selections = Array(quizQs.length).fill( null )
let isSubmitted = false
let alreadySelected = false

Array.from(options).forEach((option) => option.addEventListener("click", handleClick))

document.getElementById("quiz-container").style.display="none"
document.getElementById("next").addEventListener("click", (event) => changeQuestion(1))
document.getElementById("previous").addEventListener("click", (event) => changeQuestion(-1))
document.getElementById("submit").addEventListener("click", (event) => submitQuiz())
document.getElementById("createQuestion").addEventListener("click", (event) => createQuestion())
document.getElementById("createCategory").addEventListener("click", (event) => createCategory())
document.getElementById("login").addEventListener("click", (event) => login())
document.getElementById("logout").addEventListener("click", (event) => logout())

//document.getElementById("logout").addEventListener("click", (event) => logout())


async function login(){    
    const username = document.getElementById("username").value
    const response = await fetch("/api/login", { //  /login?
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username}) 
    })

    if( !response.ok ) {
        console.error( "Error logging in user" );
        return;
    }
    
    else{
        document.getElementById("quiz-container").style.display="block"
        getQuestions()
    }
}

async function logout(){    
    const response = await fetch("/api/logout", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
    })

    if( !response.ok ) {
        console.error( "Error logging out user" );
        return;
    }
    
    else{
        document.getElementById("quiz-container").style.display="none"
        quizQs = []
    }
}

async function getQuestions() {
    let response = await fetch( "/api/questions" ); //without domain name, assumes domain is the same as the main.js

    if( !response.ok ) {
        console.error( "Failed to retrieve Quiz Questions from API" );
        return;
    }

    let d = await response.json()

    quizQs = d
    loadQuestion()
}

function loadQuestion(){
    currentQ = quizQs[currentQ_index]

    document.getElementById("title").textContent = currentQ.question
    getA.textContent = currentQ.optA
    getB.textContent = currentQ.optB
    getC.textContent = currentQ.optC
    getD.textContent = currentQ.optD

    if(isSubmitted){
        gradeAnswer()
    }

}

async function createCategory(){
    const newCategory = {
        category: "colors",
        tags: ["red", "blue", "yellow"]
    }

    const response = await fetch("/api/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, //tells server that data is JSON
        body: JSON.stringify(newCategory)             //conversion to string format that can be sent to other networks
    })
    
    // let d = await response.json()
    // console.log(d)
}

async function createQuestion(){
    const newQuestion = {
        question: "What is the capital of New York?",
        optA: "Buffalo",
        optB: "Niagara Falls",
        optC: "New York City",
        optD: "Albany",
        correct: "D"
    }

    const response = await fetch("/api/questions", {
        method: "POST",
        headers: {"Content-Type": "application/json"}, //tells server that data is JSON
        body: JSON.stringify(newQuestion)             //conversion to string format that can be sent to other networks
    })
    
    let d = await response.json()
    quizQs = d
}

function changeQuestion(direction){
    
    currentQ_index += direction

    if(currentQ_index >= 0 && currentQ_index < quizQs.length ){
        loadQuestion()
        resetQuestion(direction)
    }

    else {
        currentQ_index -= direction
    }
}

function handleClick(event){
    alreadySelected = selections[currentQ_index] != null
    
    if (isSubmitted && alreadySelected){
        return
    }

    if(alreadySelected){
        previousSelected = document.getElementById(selections[currentQ_index])
        if (previousSelected != null){
            previousSelected.classList.remove("selected")
        }
    }

    let selection = event.target
    selection.classList.add("selected")
    selections[currentQ_index] = selection.id

}

function gradeAnswer(){
    let grade = document.getElementById("grade")
    let Q = quizQs[currentQ_index]


    if(Q.correct == selections[currentQ_index]){
        grade.classList.remove("wrong")
        grade.classList.add("right")
        grade.textContent = "Correct!"
    }

    else{
        grade.classList.remove("right")
        grade.classList.add("wrong")
        grade.textContent = "Incorrect!"
    }   
}

function submitQuiz(){
    isSubmitted = true
    gradeAnswer()
}

function resetQuestion(direction){
    let prevSelectedForLastQuestion = document.getElementById(selections[currentQ_index - direction])
    let prevSelectedForCurrentQuestion = document.getElementById(selections[currentQ_index])

    let grade = document.getElementById("grade")

    if(prevSelectedForLastQuestion != null){
        prevSelectedForLastQuestion.classList.remove("selected")
        grade.classList.remove("right")
        grade.classList.remove("wrong")
        grade.textContent = ""
    }

    if(prevSelectedForCurrentQuestion != null){
        if(isSubmitted){
            gradeAnswer()
        }
        
        prevSelectedForCurrentQuestion.classList.add("selected")
    }
}





// function processQuestions(data){
//     results = data.map(question => {
//         const optA = question.answers.answer_a;
//         const optB = question.answers.answer_b;
//         const optC = question.answers.answer_c;
//         const optD = question.answers.answer_d;
//         let correct = null

//         const myObject = question.correct_answers
//         for(key in myObject){
//             if(myObject[key]=="true"){
//                 let keyFormatted = key.split("_")[1].toUpperCase()
//                 correct = keyFormatted
//                 break
//             }
//         }
//         let myQuestion = {
//             question: question.question,
//             optA,
//             optB,
//             optC,
//             optD,
//             correct
//         };
//         return myQuestion
//     }) 
//     return results
// }

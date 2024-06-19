let q1 = {
    question: "What is 1 foot in inches?",
    optA: "1 inch",
    optB: "2 inches",
    optC: "3 inches",
    optD: "12 inches",
    correct: "D"
}

let q2 = {
    question: "What is the color of the sun?",
    optA: "yellow",
    optB: "purple",
    optC: "black",
    optD: "blue",
    correct: "A"
}


let quizQs = [q1, q2]
let currentQ_index = 0
let score = 0

let getA = document.getElementById("A")
let getB = document.getElementById("B")
let getC = document.getElementById("C")
let getD = document.getElementById("D")
let options = document.getElementsByClassName("option")
let selections = Array(quizQs.length).fill( null )
let isSubmitted = false
let alreadySelected = false

Array.from(options).forEach((option) => option.addEventListener("click", handleClick))

loadQuestion()
document.getElementById("next").addEventListener("click", (event) => changeQuestion(1))
document.getElementById("previous").addEventListener("click", (event) => changeQuestion(-1))
document.getElementById("submit").addEventListener("click", (event) => submitQuiz())


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

function changeQuestion(direction){
    currentQ_index += direction

    if(currentQ_index >= 0 && currentQ_index < quizQs.length ){
        loadQuestion()
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

    
function resetQuestionHighlights(){
    let prevSelectedForLastQuestion = document.getElementById(selections[currentQ_index - direction])

    if(prevSelectedForLasyQuestion != null){
        prevSelectedForCurrentQuestion.classList.add("selected")
    }
}



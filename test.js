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

getQuestions()
//loadQuestion()
document.getElementById("next").addEventListener("click", (event) => changeQuestion(1))
document.getElementById("previous").addEventListener("click", (event) => changeQuestion(-1))
document.getElementById("submit").addEventListener("click", (event) => submitQuiz())

//console.log(quizQs)
async function getQuestions() {
    // let response = await fetch( "https://opentdb.com/api.php?amount=10" );
    // if( !response.ok ) {
    //     console.error( "Failed to retrieve Quiz Questions from API" );
    //     return;
    // }

    // let data = await response.json();
    // let raw = data.results;

    let apiKey = "3aGi3iTtljVSOSWg6x77gN7M7gQK3KKRWqwT79un"
    let r = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=Code`)
    let d = await r.json()

    
    console.log("NEW DATA:", d)
    quizQs = processQuestions(d)
    console.log("quizQ=", quizQs)
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

function processQuestions(data){
    console.log(data)
    results= data.map(question => {
        const optA = question.answers.answer_a;
        const optB = question.answers.answer_b;
        const optC = question.answers.answer_c;
        const optD = question.answers.answer_d;
        let correct = null

        const myObject = question.correct_answers
        for(key in myObject){
            if(myObject[key]=="true"){
                let keyFormatted = key.split("_")[1].toUpperCase()
                correct = keyFormatted
                break
            }
        }
        let myQuestion = {
            question: question.question,
            optA: optA,
            optB: optB,
            optC: optC,
            optD: optD,
            correct
        };
        console.log(myQuestion)
        return myQuestion
    }) 
    console.log("result=", results) 
    return results
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
    console.log("alreadySelected before assignment: ", alreadySelected)

    alreadySelected = selections[currentQ_index] != null
    
    if (isSubmitted && alreadySelected){
        return
    }

    if(alreadySelected){
        previousSelected = document.getElementById(selections[currentQ_index])
        console.log("previousSelected: ", previousSelected)
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

    console.log("null:", prevSelectedForLastQuestion)

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

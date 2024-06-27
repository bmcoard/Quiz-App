
let quizQs = []
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
document.getElementById("next").addEventListener("click", (event) => changeQuestion(1))
document.getElementById("previous").addEventListener("click", (event) => changeQuestion(-1))
document.getElementById("submit").addEventListener("click", (event) => submitQuiz())

async function getQuestions() {
    let response = await fetch( "https://opentdb.com/api.php?amount=10" );
    if( !response.ok ) {
        console.error( "Failed to retrieve Quiz Questions from API" );
        return;
    }

    let data = await response.json();
    let raw = data.results;

    let apiKey = "3aGi3iTtljVSOSWg6x77gN7M7gQK3KKRWqwT79un"
    let r = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=10`)
    let d = await r.json()
    //let raw =


    console.log("NEW DATA:", d)
    quizQs = processQuestions(raw)
    loadQuestion()
}

function loadQuestion(){
    currentQ = quizQs[currentQ_index]
    
    document.getElementById("title").textContent = currentQ.question
    getA.textContent = currentQ.optionA
    getB.textContent = currentQ.optionB
    getC.textContent = currentQ.optionC
    getD.textContent = currentQ.optionD

    if(isSubmitted){
        gradeAnswer()
    }

}

function processQuestions(raw){
    return raw.map(question => {
        //question = question.question; redundant?
        const optA = question.incorrect_answers[0];
        const optB = question.incorrect_answers[1];
        const optC = question.incorrect_answers[2];
        const optD = question.correct_answer;
        const correct = "D";
        return {
            question: question.question,
            optionA: optA,
            optiontB: optB,
            optionC: optC,
            optionD: optD,
            correct
        };
    })  
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

    console.log(prevSelectedForLastQuestion)

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

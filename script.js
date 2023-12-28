const question = [{
    question: "Which is larget animal in the world?",
    answers: [
        {text: "Shark", correct: false},
        {text: "Blue Whale", correct: true},
        {text: "Dog", correct: false},
        {text: "Cat", correct: false},
    ]
},
    {
        question: "1+1=?",
        answers: [
            {text: "3", correct: false},
            {text: "2", correct: true},
            {text: "1", correct: false},
            {text: "6", correct: false},
        ] 
    },
    {
        question: "100-45=?",
    answers: [
        {text: "10", correct: false},
        {text: "55", correct: true},
        {text: "45", correct: false},
        {text: "35", correct: false},
    ]
    }
];
// tạo biến chỉ câu hỏi
const questionElement = document.getElementById("question");
// biến chỉ nút trả lời
const answerButton = document.getElementById("answer-button");
// 
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0; // vị trí câu hỏi hiện tại
let score = 0; // điểm

// hàm bắt đầu
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton (){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();
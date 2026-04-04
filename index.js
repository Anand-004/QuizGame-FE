const startScreen = document.getElementById("start-quiz");
const quizScreen = document.getElementById("quiz-quiz");
const resultScreen = document.getElementById("quiz-result");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question");
const answersContainer = document.getElementById("quiz-questions");
const currentQuestionSpan = document.getElementById("currentQuestion");
const totalQuestionsSpan = document.getElementById("totalQuestion");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-msg");
const restartButton = document.getElementById("restart");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex=0;
let score =0;
let answerdisabled=false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length*2;

startButton.addEventListener('click',startquiz);
restartButton.addEventListener('click',restartquiz);

function restartquiz(){
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}

function startquiz(){
    console.log("Quiz Started");
    score=0;
    currentQuestionIndex=0;
    scoreSpan.textContent=score;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestions();
}

function showQuestions(){
    answerdisabled=false;

    const currentQuestion=quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent=currentQuestionIndex+1;

    const progresspercent=(currentQuestionIndex/quizQuestions.length)*100;

    progressBar.style.width=progresspercent+"%";
    questionText.textContent=currentQuestion.question;

    answersContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct=answer.correct;
        button.addEventListener('click',()=>{
            console.log(answer);
        })
        button.addEventListener('click',selectAnswer);
        answersContainer.appendChild(button);

    })

}

function selectAnswer(event){
    if(answerdisabled) return;

    answerdisabled=true;
    const selectedbutton=event.target;
    const iscorrect=selectedbutton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add('correct');
        }else{
            button.classList.add('wrong');
        }
    })

    if(iscorrect){
        score++;
        scoreSpan.textContent=score;

    }

    setTimeout(()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex<quizQuestions.length){
            showQuestions();
        }else{
            showresults();
        }
    },1000)
    
}

function showresults(){
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    maxScoreSpan.textContent=(quizQuestions.length)*2;
    finalScoreSpan.textContent=score*2;
    if(score<2){
        resultMessage.textContent="Not Bad Try Again !";
    }else if(score<=3){
        resultMessage.textContent="Good Score keep Learning !";
    }else if(score<=4){
        resultMessage.textContent="Great score Knowledgable human!";
    }else{
        resultMessage.textContent="bullsEye your'e a GENIUS !";
    }
}



/*
psuedo-code

create
questions database: questions [answers = {"answer1":true, answer2:false...}]
score

Load website
Display:
button 'view highscore'
'timer'
button 'start quiz'

click 'start quiz'
    initialize
    score = 0
    timer = 5
    answeredQuestions = 0;
    if (answeredQuestions < questions.length) or timer = 0 { 
        load question and answer
            click answer
            if right
                score++
            else
                timer--
    }
    else
        set score
        replay again

*/ 

// The questions and answers to be used
const questionSet = [
    question1 = "q1",
    question2 = "q2",
    question3 = "q3",
    question4 = "q4",
    question5 = "q5",
    question6 = "q6"
];

const answerSet =[
    answers1 = [
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholderTrue",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ],
    answers2 = [ 
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ],
    answers3 = [
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ],
    answers4 = [
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ],
    answers5 = [
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ],
    answers6 = [
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": true,
        },
        {
            "answer": "placeholder",
            "truth": false,
        },
        {
            "answer": "placeholder",
            "truth": false,
        }
    ]
]

const quizTotal = [questionSet, answerSet];
// object that'll be stored after the game ends
let score = {
    initials : "",
    score : 0,
};

// Initializes vairables for the menus.  Sets start to show and the quiz and highscore menus to be hidden by default.

var startMenu = document.getElementById("startMenu");
var quizMenu = document.getElementById("quiz");
var highscoreMenu = document.getElementById("highscore");
var startButton = document.getElementById("startButton");

// hides the quiz and highscore menus at the start.
quizMenu.style.display = "none";
highscoreMenu.style.display = "none";

startButton.addEventListener("click", startGame);

// document.getElementById("question").innerText = "It works!";  Can use this to replace content HTML elements.


function startGame(event) {
    event.stopPropagation();
    startMenu.style.display = "none";
    quizMenu.style.display = "block";
    var timer = 6;
    var set = 0;
    console.log(timer);
    runQuiz(timer, set);
    
};

function runQuiz(timerCount, set) {
    console.log("after " + timerCount)
    var returnTime = timerCount;
    var returnSet = set;
    if(timerCount === 0 || set >= 6){
        scoreMenu();
    }
    else{
        var q = document.getElementById("question");
        var a1 = document.getElementById("answer1");
        var a2 = document.getElementById("answer2");
        var a3 = document.getElementById("answer3");
        var a4 = document.getElementById("answer4");
        var counterTime = document.getElementById("timer");
        
        // creates event listeners for the HTML elements
        a1.addEventListener("click", function (event) {
           var returnTime = checkAnswer(event, answer1, timerCount)
           returnSet++;
           runQuiz(returnTime, returnSet);
        });
        a2.addEventListener("click", function (event) {
            var returnTime = checkAnswer(event, answer2, timerCount)
            returnSet++;
            runQuiz(returnTime, returnSet);
        });
        a3.addEventListener("click", function (event) {
            var returnTime = checkAnswer(event, answer3, timerCount)
            returnSet++;
            runQuiz(returnTime, returnSet);
        });
        a4.addEventListener("click", function (event) {
            var returnTime = checkAnswer(event, answer4, timerCount)
            returnSet++;
            runQuiz(returnTime, returnSet);
        });

        // selects the answers and questions from quizTotal
        var question = quizTotal[0][set];
        var answer1 = quizTotal[1][set][0];
        var answer2 = quizTotal[1][set][1];
        var answer3 = quizTotal[1][set][2];
        var answer4 = quizTotal[1][set][3];
        
        
        // Updates html elements with appropriate values
        q.innerText = question;
        a1.innerText = answer1.answer;
        a2.innerText = answer2.answer;
        a3.innerText = answer3.answer;
        a4.innerText = answer4.answer;
        counterTime.innerText = "Timer: " + timerCount.toString();

        console.log(returnSet);
        console.log(returnTime);

    }
};

function checkAnswer(event, answer, timerCount) {
    event.stopPropagation();
    var feedback = document.getElementById("feedback");
    var timer = timerCount;
    console.log(answer);
    if (answer.truth){
        feedback.innerText = "Correct!"
    }
    else {
        feedback.innerText = "Try again!"
        timer--;
    }
    return timer;
};
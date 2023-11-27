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

 
 class Question {
    constructor(description, answers, correctAnswer) {
        this.description = description;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
       
    }
    getAnswer(index) {
        return this.answers[index];
    }
    getCorrectAnswer() {
        return this.correctAnswer;
    }
    getDescription() {
        return this.description;
    }
 }
 
 class QuestionSet{
    constructor(set) {
        this.questions = set;
    }

    getQuestion(index) {
        return this.questions[index];
    }
    getSetLength() {
        return this.questions.length;
    }
   
 }
// class Question creates objects with description, an array of answers, the correct answer
 var q1 = new Question("this is a question1",["an answer", "another one", "and the last one", "I lied"], 3);
 var q2 = new Question("this is a question2",["an answer", "another one", "and the last one", "I lied"], 3);
 var q3 = new Question("this is a question3",["an answer", "another one", "and the last one", "I lied"], 3);
 var q4 = new Question("this is a question4",["an answer", "another one", "and the last one", "I lied"], 3);
 var q5 = new Question("this is a question5",["an answer", "another one", "and the last one", "I lied"], 3);
 var q6 = new Question("this is a question6",["an answer", "another one", "and the last one", "I lied"], 3);

 
 // Creates an array that stores the questions
 var set = new QuestionSet([q1, q2, q3, q4, q5, q6]);
// object that'll be stored after the game ends

// Initializes vairables for the menus.  Sets start to show and the quiz and highscore menus to be hidden by default.

var startMenu = document.getElementById("startMenu");
var quizMenu = document.getElementById("quiz");
var highscoreMenu = document.getElementById("highscore");
var finalScoreMenu = document.getElementById("finalScore");
var startButton = document.getElementById("startButton");
var timerUI = document.getElementById("timer");

// hides the quiz and highscore menus at the start.
quizMenu.style.display = "none";
highscoreMenu.style.display = "none";
finalScoreMenu.style.display = "none";
timerUI.style.display = "none";

startButton.addEventListener("click", startGame);

var q = document.getElementById("question");
var a1 = document.getElementById("answer1");
var a2 = document.getElementById("answer2");
var a3 = document.getElementById("answer3");
var a4 = document.getElementById("answer4");
var counterTime = document.getElementById("timer");
var clear = document.getElementById("clearScore");
var restart = document.getElementById("return");


var quizState = {
    time: 6,
    currentQuestion: 0,
    clickedAnswer: 0,
}
// stores keys of scores to prevent repeats
var storedList = [];
// creates event listeners for the HTML elements () =>
a1.addEventListener("click", () => {
    quizState.clickedAnswer = 0;
    updateState();
}
);
a2.addEventListener("click", () => {
    quizState.clickedAnswer = 1;
    updateState();
});
a3.addEventListener("click", () => {
    quizState.clickedAnswer = 2;
    updateState();
});
a4.addEventListener("click", () => {
    quizState.clickedAnswer = 3;
    updateState();
});
// creates eventlistener for the scoreSubmit button
document.getElementById("submit").addEventListener("click", (event) => {
    storeScore();
    highMenu();
});
// creates eventListener for the restart button
restart.addEventListener("click", (event) => {
    event.stopPropagation;
    highscoreMenu.style.display = "none";
    startMenu.style.display = "block";
})
// creates eventListener for the clearScore
clear.addEventListener("click", (event) => {
    event.stopPropagation;
    clearScore();
})
document.getElementById("score").addEventListener("click", (event)=> {
    event.stopPropagation;
    quizMenu.style.display = "none";
    startMenu.style.display = "none";
    finalScoreMenu.style.display = "none";
    timerUI.style.display = "none";
    highMenu();
});

function startGame(event) {
    console.log(`starting game`);
    startMenu.style.display = "none";
    timerUI.style.display = "inline-block";
    quizMenu.style.display = "block";
    quizState.time = 6;
    quizState.currentQuestion = 0;
    renderQuestion();
    console.log(timer);
};

function renderQuestion(){
   // selects the answers and questions from quizTotal
    var question = set.getQuestion(quizState.currentQuestion);
    var answer1 = question.getAnswer(0);
    var answer2 = question.getAnswer(1);
    var answer3 = question.getAnswer(2);
    var answer4 = question.getAnswer(3);

    //updates timer
    counterTime.innerText = "Timer: " + quizState.time ;
    
    // Updates html elements with appropriate values
    q.innerText = question.getDescription();
    a1.innerText = answer1;
    a2.innerText = answer2;
    a3.innerText = answer3;
    a4.innerText = answer4;

}

function updateState() {
    console.log(`timer is ${quizState.time}`);
    console.log(`set is ${quizState.currentQuestion}`);
    if(quizState.time === 0 || quizState.currentQuestion >= set.getSetLength()-1){
        finalMenu(quizState.time);
    }
    else{
        var question = set.getQuestion(quizState.currentQuestion);
        var isCorrectAnswer = question.getCorrectAnswer() == quizState.clickedAnswer;
        printFeedback(isCorrectAnswer);
        if(!isCorrectAnswer) {
            quizState.time--;
        }
        
        quizState.currentQuestion++;
    renderQuestion();
    }
};

function printFeedback(validity) {
    var feedback = document.getElementById("feedback");
    if (validity){
        feedback.innerText = "Correct!"
    }
    else {
        feedback.innerText = "Try again!"

    }
};

function finalMenu(){
    document.getElementById("final1").innerText = "Your final score was: " + quizState.time;
    timerUI.style.display = "none";
    quizMenu.style.display = "none";
    finalScoreMenu.style.display = "block";
}

function highMenu(){
    finalScoreMenu.style.display = "none";
    highscoreMenu.style.display = "block";
    printScore();
}

function checkKeyCopy(storedKey, currentKey){
    let duplicate = false;
    for(let i = 0; i < storedKey.length; i++){
        if (storedKey[i] === currentKey){
            duplicate = true;
            return duplicate;
        }
    }
    return duplicate;
}
function printScore(){
    console.log("start printing");
    let storageList = getScore();
    console.log(`storagelist: ${storageList}`);
    let scoreList = document.getElementById("scoreList");
    console.log(`child elements ${scoreList.childElementCount}`)
    if(scoreList.childElementCount < 6){
        for(let i = 0; i < storageList.length && i < 6; i++){
            console.log(`i = ${i}`);
            let keyCurrent =  storageList[i].key;
            console.log(`keyCurrent = ${keyCurrent}\ncopy=${checkKeyCopy(storedList, keyCurrent)}`);
            if(!checkKeyCopy(storedList, keyCurrent)){
                let node = document.createElement("p");
                let textNode = `initals:${storageList[i].initials} score:${storageList[i].score}`;
                storedList.push(keyCurrent);
                console.log(`stored keys = ${storedList}`);      
                node.append(textNode);
                scoreList.append(node);
            }
        }
    }
    console.log(`printedscore`);
    console.log(storageList);
}
function clearScore(){
    let scoreList =  document.getElementById("scoreList");
    storedList = [];
    console.log(`check if storedList is cleard: ${storedList}`);
    while(scoreList.firstChild) {
        scoreList.removeChild(scoreList.lastChild);
    }
    localStorage.clear();
}

function storeScore(){
            var initials = document.getElementById("initials").value;
            console.log(`intials are ${initials}`)

            var storeScore = {
                initials: initials,
                score: quizState.time
            };

            var scoreKey = "score" + localStorage.length;
            localStorage.setItem(scoreKey, JSON.stringify(storeScore));
            console.log('score stored');
}

function getScore(){
    let returnScore = [];
    for (i=0;i<localStorage.length;i++){
        let key = localStorage.key(i);
        //console.log(`key ${key}`);
        var obj = {};
        var objGet = JSON.parse(localStorage.getItem(key));
        //console.log(`data ${objGet}`);
        //console.log(objGet.initials, objGet.score);
        obj.key = key;
        obj.initials = objGet.initials;
        obj.score = objGet.score;
        //console.log(`retrieved data ${obj}`);
        returnScore.push(obj);
    }
    console.log(`Returned score ${returnScore}`);
    return returnScore;
}

/* TODO
fix looping issues in runQuiz
display scores
create CSS
*/

/*const answerSet =[
    answers1 = [
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ],
    answers2 = [ 
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ],
    answers3 = [
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ],
    answers4 = [
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ],
    answers5 = [
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ],
    answers6 = [
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholdertrue",
            truth: true,
        },
        {
            answer: "placeholder",
            truth: false,
        },
        {
            answer: "placeholder",
            truth: false,
        }
    ]
] */
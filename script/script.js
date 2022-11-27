'use strict'
let questionAmount = 0;
let playedQuestions = [];
let currentQuestionNumber = 0;
let correctAnswers = 0;

let questions = [
    {
        "question": "frage 1?",
        "answer_1": "Antwort 1",
        "answer_2": "Antwort 2",
        "answer_3": "Antwort 3",
        "answer_4": "Antwort 4",
        "correctAnswerNumber": 4,
    },
    {
        "question": "frage 2?",
        "answer_1": "Antwort 1",
        "answer_2": "Antwort 2",
        "answer_3": "Antwort 3",
        "answer_4": "Antwort 4",
        "correctAnswerNumber": 2,
    },
    {
        "question": "frage 3?",
        "answer_1": "Antwort 1",
        "answer_2": "Antwort 2",
        "answer_3": "Antwort 3",
        "answer_4": "Antwort 4",
        "correctAnswerNumber": 2,
    },
    {
        "question": "frage 4?",
        "answer_1": "Antwort 1",
        "answer_2": "Antwort 2",
        "answer_3": "Antwort 3",
        "answer_4": "Antwort 4",
        "correctAnswerNumber": 3,
    },

];

function init() {
    showStartScreen();

};

function showStartScreen() {
    document.getElementById('questionCard').innerHTML = /*html*/ `
     <div>
     <div class="card">
         <div class="d-flex justify-content-center card-body">
             <h2>Wieviele Fragen möchtest du spielen?</h2>
         </div>
     </div>

     <div class="card">
         <div class="startScreen d-flex justify-content-center card-body">
             <button><img onclick="startGame(3)" src="img/5q.png" alt="5-QuestionsButton"></button>
             <button><img onclick="startGame(10)" src="img/10q.png" alt="5-QuestionsButton"></button>
             <button><img onclick="startGame(15)" src="img/15q.png" alt="5-QuestionsButton"></button>
         </div>
     </div>
    `

};    

function startGame(x) {
    questionAmount = x; 
    showQuestion();
};


function showQuestion() {
    currentQuestionNumber++;

    let questionID = Math.floor(Math.random() * (questions.length)) /* randomized ID from question from the questions array*/
    let answers = shuffleAnswers();
    let questionCardElement = document.getElementById('questionCard');

    console.log(answers);
    console.log(answers[1])

    // START html
    questionCardElement.innerHTML = /*html*/ `

    <h5 class="mb-3 card-title">${questions[questionID]['question']}</h5>

    <div class="answersBlock">
        <div id="${answers[0]}" disabled onclick="checkAnswer(${questionID},'${answers[0]}')" class="cardAnswer card">
            <div class="card-body">
            ${questions[questionID][answers[0]]}
            </div>
        </div>
        <div id="${answers[1]}" onclick="checkAnswer(${questionID},'${answers[1]}')" class="cardAnswer card">
            <div class="card-body">
            ${questions[questionID][answers[1]]}
            </div>
        </div>
        <div id="${answers[2]}" onclick="checkAnswer(${questionID},'${answers[2]}')" class="cardAnswer card">
            <div class="card-body">
            ${questions[questionID][answers[2]]}
            </div>
        </div>
        <div id="${answers[3]}" onclick="checkAnswer(${questionID},'${answers[3]}')" class="cardAnswer card">
            <div class="card-body">
            ${questions[questionID][answers[3]]}
            </div>
        </div>

        <div id="cardFooter"
         class="cardFooter px-3 border-top d-flex justify-content-between align-items-center">
         <span><b id="currentQuestionNumber">1</b> von <b id="questionAmount">15</b> Fragen</b></span>
         <button id="nextQuestionButton" onclick="checkProgress()" type="button" disabled
         class="btn btn-primary text-light">Nächste Frage</button>
        </div>
    `

    renderCardFooter();
    // html END

}


function shuffleAnswers() {
    {
        let answersKeys = ["answer_1", "answer_2", "answer_3", "answer_4"];
        let answersKeysShuffled = []
        let i = 0;

        // While there remain elements to shuffle…
        while (answersKeys.length) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * answersKeys.length);

            // And move it to the new array.
            answersKeysShuffled.push(answersKeys.splice(i, 1)[0]);

        }

        return answersKeysShuffled;
    }
};



function renderCardFooter() {
    let currentQuestionNumberElement = document.getElementById('currentQuestionNumber')
    let questionAmountElement = document.getElementById('questionAmount');

    questionAmountElement.innerHTML = questionAmount;
    currentQuestionNumberElement.innerHTML = currentQuestionNumber;

    if (currentQuestionNumber == questionAmount) {
        document.getElementById('nextQuestionButton').innerHTML = "Auswertung";
    }


};

function checkAnswer(questionID, selection) {
    let selectionNumber = selection.slice(-1);
    let correctAnswerElement = document.getElementById(`answer_${questions[questionID]['correctAnswerNumber']}`);
    let selectedAnswerElement = document.getElementById(selection);

    correctAnswerElement.classList.add('bg-success', 'text-light');

    if (selectionNumber != questions[questionID]['correctAnswerNumber']) {
        selectedAnswerElement.classList.add('bg-danger', 'text-light');

    } else {
        correctAnswers += 1;
        console.log(correctAnswers);
    }

    document.getElementById('nextQuestionButton').disabled = false;
    makeAnswersUnclickable();
    playedQuestions.push(questions[questionID]);
    questions.splice(questionID, 1);
    console.log(`gespielte Fragen: ${playedQuestions} | verbleibende Fragen: ${questions}`);

};

function makeAnswersUnclickable() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`answer_${i}`).classList.add('unclickable');
    }
};

function checkProgress() {
    document.getElementById('nextQuestionButton').disabled = true;
    if (currentQuestionNumber < questionAmount) {
        showQuestion();
    } else {
        showEndScreen();
    }
}

function showEndScreen() {
   
}


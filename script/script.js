'use strict'

let questionAmount = 2;
let playedQuestions = [];
let currentQuestionNumber = 0;
let correctAnswers = 0;

// Sounds
let AUDIO_correctAnswer = new Audio('audio/rightAnswer.wav');
let AUDIO_wrongAnswer = new Audio('audio/wrongAnswer.wav');
let AUDIO_allAnswersRight = new Audio('audio/allAnswersRight.ogg');
let AUDIO_endScreen = new Audio('audio/taskSuccess.mp3');

function init() {
    showStartScreen();
};

function showStartScreen() {
    document.getElementById('questionCard').innerHTML = /*html*/ `
     <div>
     <div class="card">
         <div class="d-flex justify-content-center card-body h-100">
             <h2>Wieviele Fragen möchtest du spielen?</h2>
         </div>
     </div>

     <div class="card">
         <div class="startScreen px-sm-5 d-flex justify-content-between align-items-center card-body">
             <button onclick="startGame(5)">5</button>
             <button onclick="startGame(10)">10</button>
             <button onclick="startGame(15)">15</button>
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
    
    let questionCardElement = document.getElementById('questionCard');

    renderProgressBar(currentQuestionNumber);

    // render Question Card:
    questionCardElement.innerHTML = /*html*/ `

        <h5 class="mb-2 card-title">${questions[questionID]['question']}</h5>

        <div id="answersBlock">    
        </div>

        <div id="cardFooter"
        class="cardFooter border-top d-flex justify-content-between align-items-center">
        <span>Frage&nbsp<b id="currentQuestionNumber">1</b>&nbspvon&nbsp<b id="questionAmount">15</span>
        <button id="nextQuestionButton" onclick="checkProgress()" type="button" disabled
        class="btn btn-primary text-light">Nächste Frage</button>
         </div>
         `;

    renderAnswers(questionID);
    setButtonText();
    // html END

};

function renderProgressBar(questionNumber) {
    let progressbarElement = document.getElementById('progressbar');
    let progressDecimal = (questionNumber - 1) / questionAmount;
    let progressValue = Math.ceil(progressDecimal * 100);

    progressbarElement.style.width = `${ progressValue }% `;
};

function renderAnswers(questionID) {
    let answers = shuffleAnswers();
    let answersBlockElement = document.getElementById('answersBlock');
    let marker = ["A", "B", "C", "D"];


    console.log(questions[questionID][`answer_${questions[questionID]['correctAnswerNumber']}`]);
    
    for(let i = 0; i < answers.length; i++) {

    answersBlockElement.innerHTML += /*html*/ `
    <div id="${answers[i]}" onclick="checkAnswer(${questionID},'${answers[i]}')" class="cardAnswer card">
         <div class="card-body d-flex align-items-center py-0">
              <span class="marker fs-5 border-end pe-3">${marker[i]}</span><span class="ps-3">${questions[questionID][answers[i]]}</span>
         </div>
    </div>
    `
    }

};

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



function setButtonText() {
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
        AUDIO_wrongAnswer.play();

    } else {
        correctAnswers += 1;
        AUDIO_correctAnswer.play();

    }

    document.getElementById('nextQuestionButton').disabled = false;
    makeAnswersUnclickable();
    playedQuestions.push(questions[questionID]);
    questions.splice(questionID, 1);
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
};

function showEndScreen() {
    renderProgressBar(currentQuestionNumber + 1);

    document.getElementById('questionCard').innerHTML = /*html*/ `
    <div class="card">

    </div>

        <div class="endScreen mt-5 d-flex flex-column justify-content-center align-items-center">
            ${renderEndscreenText()}
        <button onclick=reset() class="btn btn-primary mt-4"> Neu starten</button>
    </div >
        `
};

function renderEndscreenText() {
    let result = correctAnswers / questionAmount;

    if ((correctAnswers == questionAmount)) {
        AUDIO_allAnswersRight.play();

        return /*html*/ `<h2 class="mb-3">Besser geht's nicht!</h2>
        <span> Du hast alle ${questionAmount} Fragen richtig beantwortet!</span>

            <span>Natürlich darfst du trotzdem gerne nochmal spielen ;&#041;<span></span></span>
    `
    } else {
        AUDIO_endScreen.play();

        if (result > 0.7) {
            return /*html*/ `<h2 class="mb-4">Sehr gut!</h2>
        <span>Du hast ${correctAnswers} von ${questionAmount} Fragen richtig beantwortet.</span>

        <span>Wenn du willst versuche es doch einfach nochmal!</span>
    `
        } else if (result > 0.5) {
            return /*html*/ `<h2 class="mb-4"> Super!</h2 >
        <span>Du hast ${correctAnswers} von ${questionAmount} Fragen richtig beantwortet.</span>
    
        <span>Wenn du willst versuche es doch einfach nochmal!</span>
    `
        } else if (result > 0) {
            return /*html*/ `<h2 class="mb-4"> Hoppla!</h2>
        <span>Du hast nur ${correctAnswers} von ${questionAmount} Fragen richtig beantwortet.</span>

        <span>Versuche es doch nochmal!</span>
    `
        } else {
            return /*html*/ `<h2 class="mb-4"> Hoppla!</h2>
        <span>Du hast keine Frage richtig beantwortet.</span>

        <span>Versuche es doch nochmal!</span>
    `
        }
    };

};

function reset() {
    for (let i = 0; i < playedQuestions.length; i++) {
        questions.push(playedQuestions[i]);
    };

    playedQuestions = [];
    currentQuestionNumber = 0;
    correctAnswers = 0;

    init();
};


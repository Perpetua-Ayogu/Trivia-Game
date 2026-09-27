// my questions

const questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Home Tool Markup Language",
      "Hyper Tool Main Language"
    ],
    answer: "HyperText Markup Language"
  },

  {
    question: "Which keyword can create a variable in JavaScript?",
    choices: [
      "let",
      "html",
      "print",
      "style"
    ],
    answer: "let"
  },

  {
    question: "Which one is strict equality?",
    choices: [
      "=",
      "==",
      "===",
      "!="
    ],
    answer: "==="
  },

  {
    question: "Which method can select an HTML element?",
    choices: [
      "document.querySelector()",
      "document.print()",
      "console.select()",
      "html.find()"
    ],
    answer: "document.querySelector()"
  },

  {
    question: "Which method listens for an event?",
    choices: [
      "addEventListener()",
      "addClick()",
      "listen()",
      "startEvent()"
    ],
    answer: "addEventListener()"
  }
];


// game variables

let score = 0;
let currentQuestion = 0;
let timeLeft = 10;
let timer;


// DOM

const question = document.querySelector("#question");
const answers = document.querySelectorAll(".answer");
const feedback = document.querySelector("#feedback");
const scoreText = document.querySelector("#score");
const timerText = document.querySelector("#timer");
const startButton = document.querySelector("#start");


// start game

function startGame() {
  score = 0;
  currentQuestion = 0;

  scoreText.textContent = score;
  startButton.style.display = "none";

  answers.forEach((button) => {
    button.style.display = "block";
  });

  showQuestion();
}


// show question

function showQuestion() {

  if (currentQuestion >= questions.length) {
    endGame();
    return;
  }

  const current = questions[currentQuestion];

  question.textContent = current.question;

  feedback.textContent = "";

  answers.forEach((button, index) => {
    button.textContent = current.choices[index];
    button.disabled = false;
  });

  startTimer();
}


// check answer

function checkAnswer(selectedAnswer) {

  clearInterval(timer);

  const current = questions[currentQuestion];

  if (selectedAnswer === current.answer) {

    feedback.textContent = "Correct!";

    score++;

  } else {

    feedback.textContent =
      "Wrong! Correct answer is " + current.answer;
  }

  scoreText.textContent = score;

  answers.forEach((button) => {
    button.disabled = true;
  });

  setTimeout(() => {

    currentQuestion++;

    showQuestion();

  }, 1500);
}


// timer

function startTimer() {

  timeLeft = 10;

  timerText.textContent = timeLeft;

  clearInterval(timer);

  timer = setInterval(() => {

    timeLeft--;

    timerText.textContent = timeLeft;

    if (timeLeft === 0) {

      clearInterval(timer);

      const current = questions[currentQuestion];

      feedback.textContent =
        "Time is up! Correct answer is " + current.answer;

      answers.forEach((button) => {
        button.disabled = true;
      });

      setTimeout(() => {

        currentQuestion++;

        showQuestion();

      }, 1500);
    }

  }, 1000);
}


// end game

function endGame() {

  clearInterval(timer);

  question.textContent = "Game Over!";

  feedback.textContent =
    "Your score is " +
    score +
    " out of " +
    questions.length;

  timerText.textContent = "0";

  answers.forEach((button) => {
    button.style.display = "none";
  });

  startButton.style.display = "inline-block";

  startButton.textContent = "Play Again";
}


// start button

startButton.addEventListener("click", startGame);


// answer buttons

answers.forEach((button) => {

  button.addEventListener("click", () => {

    const selectedAnswer = button.textContent;

    checkAnswer(selectedAnswer);

  });

});
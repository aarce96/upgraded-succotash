let secondsLeft = 70;

let timeEl = document.getElementById("time");
let hsEl = document.getElementById("highScores");
let btnsEl = document.getElementById("buttons");
let vsBtn = document.getElementById("viewScores");
let questionEl = document.getElementById("questions");
let resultsEl = document.getElementById("results");
let choicesEl = document.getElementById("choices");

let startBtnEl = document.getElementById("startBtn");
alert('button pressed!')
startBtnEl.addEventListener("click", setTimer);

let questionCount = 0;
let score = 0;

function setTimer() {
  displayQuestions();
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "";
    timeEl.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === codingQuestions.length) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function displayQuestions() {
  removeEls(startBtnEl);

  if (questionCount < questions.length) {
    questionEl.innerHTML = codingQuestions[questionCount].title;
    choicesEl.textContent = "";

    for (let i = 0; i < codingQuestions[questionCount].answers.length; i++) {
      let el = document.createElement("button");
      el.innerText = codingQuestions[questionCount].answers[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === codingQuestions[questionCount].answer) {
          score += secondsLeft;
        } else {
          score -= 10;
          secondsLeft = secondsLeft - 10;
        }

        questionEl.innerHTML = "";

        if (questionCount === codingQuestions.length) {
          return;
        } else {
          questionCount++;
          displayQuestions();
        }
      });
      choicesEl.append(el);
    }
  }
}

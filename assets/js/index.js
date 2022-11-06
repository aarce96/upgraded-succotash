// ALL VARIABLES
let secondsLeft = 75;
let time = document.getElementById("time");
let scoresEl = document.getElementById("scores-div");
let buttonsEl = document.getElementById("buttons");
let viewScoresBtn = document.getElementById("view-scores");
let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click", setTime);

let questionEl = document.getElementById("question-div");
let resultsEl = document.getElementById("results");
let choicesEl = document.getElementById("choices");

var questionCount = 0;
let score = 0;

function setTime() {
  displayQuestions();
  let timerInterval = setInterval(function () {
    secondsLeft--;
    time.textContent = "";
    time.textContent = "Time: " + secondsLeft;
    if (secondsLeft <= 0 || questionCount === questions.length) {
      clearInterval(timerInterval);
      captureUserScore();
    }
  }, 1000);
};

function displayQuestions() {
  removeEls(startBtn);

  if (questionCount < questions.length) {
    questionEl.innerHTML = questions[questionCount].question;
    choicesEl.textContent = "";

    for (let i = 0; i < questions[questionCount].answers.length; i++) {
      let el = document.createElement("button");
      el.innerText = questions[questionCount].answers[i];
      el.setAttribute("data-id", i);
      el.addEventListener("click", function (event) {
        event.stopPropagation();

        if (el.innerText === questions[questionCount].correctAnswer) {
          score += secondsLeft;
        } else {
          score -= 10;
          secondsLeft = secondsLeft - 15;
        }

        questionEl.innerHTML = "";

        if (questionCount === questions.length) {
          return;
        } else {
          questionCount++;
          displayQuestions();
        }
      });
      choicesEl.append(el);
    }
  }
};

function captureUserScore() {
  time.remove();
  choicesEl.textContent = "";

  let initialsInput = document.createElement("input");
  let postScoreBtn = document.createElement("input");

  resultsEl.innerHTML = `You scored ${score} points! Enter initials: `;
  initialsInput.setAttribute("type", "text");
  postScoreBtn.setAttribute("type", "button");
  postScoreBtn.setAttribute("value", "Post My Score!");
  postScoreBtn.addEventListener("click", function (event) {
    event.preventDefault();
    let scoresArray = defineScoresArray(storedArray, emptyArray);

    let initials = initialsInput.value;
    let userAndScore = {
      initials: initials,
      score: score,
    };

    scoresArray.push(userAndScore);
    saveScores(scoresArray);
    displayAllScores();
    clearScoresBtn();
    goBackBtn();
    viewScoresBtn.remove();
  });
  resultsEl.append(initialsInput);
  resultsEl.append(postScoreBtn);
};

const saveScores = (array) => {
  window.localStorage.setItem("highScores", JSON.stringify(array));
};

const defineScoresArray = (arr1, arr2) => {
  if (arr1 !== null) {
    return arr1;
  } else {
    return arr2;
  }
};

const removeEls = (...els) => {
  for (let el of els) el.remove();
};


let emptyArray = [];
let storedArray = JSON.parse(window.localStorage.getItem("highScores"));

function displayAllScores() {
  removeEls(time, startBtn, resultsEl);
  let scoresArray = defineScoresArray(storedArray, emptyArray);

  scoresArray.forEach((obj) => {
    let initials = obj.initials;
    let storedScore = obj.score;
    let resultsP = document.createElement("p");
    resultsP.innerText = `${initials}: ${storedScore}`;
    scoresEl.append(resultsP);
  });
}

function viewScores() {
  viewScoresBtn.addEventListener("click", function (event) {
    event.preventDefault();
    removeEls(time, startBtn);
    displayAllScores();
    removeEls(viewScoresBtn);
    clearScoresBtn();
    goBackBtn();
  });
}

function clearScoresBtn() {
  let clearBtn = document.createElement("input");
  clearBtn.setAttribute("type", "button");
  clearBtn.setAttribute("value", "Clear Scores");
  clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    removeEls(scoresEl);
    window.localStorage.removeItem("highScores");
  });
  scoresEl.append(clearBtn);
}

function goBackBtn() {
  let backBtn = document.createElement("input");
  backBtn.setAttribute("type", "button");
  backBtn.setAttribute("value", "Go Back");
  backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.reload();
  });
  buttonsEl.append(backBtn);
}

viewScores();
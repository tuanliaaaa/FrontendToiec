function startExam() {
    const countdownDisplay = document.getElementById("countdown-display");
    let totalSeconds = 7199;

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    clearInterval(window.countdownInterval);

    window.countdownInterval = setInterval(() => {
        if (totalSeconds > 0) {
            countdownDisplay.textContent = formatTime(totalSeconds);
            totalSeconds--;
        } else {
            countdownDisplay.textContent = "Time's up!";
            clearInterval(window.countdownInterval);
        }
    }, 1000);

    const showBoard = document.getElementById("board-container");
    let showBoardHtml = '',
        countPart = 1;
    for (let i = 1; i < 201; i++) {
        if (i === 1 || i === 7 || i === 32 || i === 71 || i === 101 || i === 131 || i === 147) {
            showBoardHtml += '<h4>Part ' + countPart + '</h4><div class="board-part"><span class="question" data-index="' + i + '">' + i + '</span>';
            countPart++;
        } else if (i === 6 || i === 31 || i === 70 || i === 100 || i === 130 || i === 146 || i === 200) {
            showBoardHtml += '<span class="question" data-index="' + i + '">' + i + '</span></div>';
        } else {
            showBoardHtml += '<span class="question" data-index="' + i + '">' + i + '</span>';
        }
    }
    showBoard.innerHTML += showBoardHtml;
}

// document.querySelectorAll(".mid-content__left--audio audio").forEach(ele => {
//     ele.addEventListener("loadedmetadata", function () {
//         parents(this, '.mid-content__left--audio')[0].setAttribute("data-custom", this.duration);
//         console.log(this.duration)
//     })
// });
document.addEventListener('DOMContentLoaded', async function () {
    document.querySelector('#show-popup-board').addEventListener('click', function () {
        let boardContainer = document.querySelector('#board-container');
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            boardContainer.classList.remove('active');
        } else {
            this.classList.add('active');
            boardContainer.classList.add('active');
        }
    });

    document.querySelectorAll('.mid__item .hello').forEach(ele => {
        ele.addEventListener('click', function () {
        });
    });
    document.querySelector('#start-exam').addEventListener('click', function () {
        document.querySelector('.page-topic-options').style.display = "none";
        document.querySelector('.page-topic-exam').style.display = "block";
        let itemActive = document.querySelector('.mid__item.active');
        itemActive.querySelector(".mid-content__left--audio audio").play();
        document.querySelector('#question-number').textContent = 1;
        document.querySelector('#count-question').textContent = 1;
        startExam();
        clearInterval(window.timePlayExamInterval);
        timePlayExam()
    })
    let answersButton = document.querySelectorAll('.answer__answer-item input');
    Array.from(answersButton).forEach(answerButton => {
        answerButton.addEventListener("change", function () {
            let listAnswerEle = parents(this, '.answer__list'),
                itemAnswerEle = parents(this, '.answer__answer-item'),
                itemQuestionEle = parents(this, '.mid-content__answer'),
                checkAnswer = false;
            if (!listAnswerEle[0].classList.contains('active')) {
                listAnswerEle[0].classList.add('active');
                this.parentElement.classList.add('choose-answer');
                document.querySelector('#board-container .question:not(.ans):not(.not-ans)').classList.add('ans');
            }
        });
    });
});

function parents(element, selector) {
    const results = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (currentElement.matches(selector)) {
            results.push(currentElement);
        }
        currentElement = currentElement.parentElement;
    }

    return results;
}

function timePlayExam() {
    let totalSeconds1 = 28;
    window.timePlayExamInterval = setInterval(() => {
        if (totalSeconds1 > 0) {
            totalSeconds1--;
        } else {
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    let itemQuestion = document.querySelectorAll('.mid__item'),
        itemQuestionActive = document.querySelector('.mid__item.active'),
        index = parseInt(itemQuestionActive.dataset.index) + 1;
    if (!itemQuestionActive.querySelector('.answer__answer-item.choose-answer')) {
        document.querySelector('#board-container .question:not(.ans):not(.not-ans)').classList.add('not-ans');
    }
    if (itemQuestion[index]) {
        itemQuestionActive.classList.remove('active');
        itemQuestion[index].classList.add('active');
        document.querySelector('#question-number').textContent = index + 1;
        document.querySelector('#count-question').textContent = index + 1;
        clearInterval(window.timePlayExamInterval);
        if (itemQuestion[index].dataset.part < 5) {
            itemQuestion[index].querySelector(".mid-content__left--audio audio").play();
            timePlayExam();
        }
    } else {
        clearInterval(window.timePlayExamInterval);
    }
}
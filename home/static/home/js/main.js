let arrAnswer = [],
    part,
    questionQty,
    partNotShowAnswer=["part1","part2"];

function setPart(partInput, questionQtyInput) {
    part = partInput;
    questionQty = questionQtyInput;
}

async function renderQuestionTpl() {
    localStorage.removeItem(part);
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbypart?count=' + questionQty + '&part=' + part);
    console.log("render Question",response);
    if (response.status >= 200 && response.status < 300) {
        let template = document.getElementById('template-page-content').innerHTML;
        let questionItemsHtml = response.data.map((item, index) => {
            let attachmentsHtml = '',
                answersHtml = '';
            if (item.resourceList && item.resourceList.length) {
                item.resourceList.forEach((resource) => {
                    if (resource.resourceType === 'audio') {
                        attachmentsHtml += `<div class="mid-content__left mid-content__left--audio" data-id="${resource.idResource}">
                            <audio controls>
                                <source src="${resource.resourceContent}" type="audio/mpeg">
                            </audio>
                        </div>`;
                    } else if (resource.resourceType === 'image') {
                        attachmentsHtml += `<div class="mid-content__left mid-content__left--img" data-id="${resource.idResource}">
                            <img src="${resource.resourceContent}">
                        </div>`;
                    } else if (resource.resourceType === 'docs') {
                        attachmentsHtml += `<div class="mid-content__left mid-content__left--text" data-id="${resource.idResource}">
                            <p>${resource.resourceContent}</p>
                        </div>`;
                    }
                });
            }

            item.questionList.forEach((question, indexQuestion) => {
                let answerItemsHtml = '';
                question.answerList.forEach((answer, indexAnswer) => {
                    answerItemsHtml += `<label class="answer__answer-item ${(answer.isCorrect) ? 'active' : ''}" data-index="${indexAnswer}" data-id="${answer.idAnswer}">
                                <input type="radio" name="radio">
                                <span class="checkmark"></span>${ partNotShowAnswer.includes(part)? String.fromCharCode(65 + indexAnswer)+".":answer.answer}
                            </label>`;
                })
                let questionLabel = question.question || 'Câu ' + (indexQuestion + 1) + ':';
                answersHtml += `<div class="mid-content__answer" data-id="${question.idQuestion}">`
                if(!partNotShowAnswer.includes(part))answersHtml +='<div class="answer__label">${questionLabel}</div>'
                answersHtml +=    `<div class="answer__list">
                        ${answerItemsHtml}
                    </div>
                </div>`;
            });

            return `
                <div class="mid__item ${(index === 0) ? 'active' : ''}" data-index="${index}" style="display: none">
                    <div class="mid__content mid__content--left">
                        ${attachmentsHtml}
                    </div>
                    <div class="mid__content mid__content--right">
                        ${answersHtml}
                    </div>
                </div>`;
        }).join('');
        document.getElementById('main-content').innerHTML += template;
        document.getElementById('main-content').querySelector('#listQuestions').innerHTML += questionItemsHtml;
    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

    }
}

async function renderHistoryResultTpl() {
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories?size=1&page=0&type=' + part, localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        let data = response.data,
            historyResult = document.getElementById('history-result');
        if(data.length!=0)
        {

            let historyResultHtml = `<p>Số câu đã làm: <span>${data[0].amountQuestionGroup}</span></p>
            <p>Score: <span>${data[0].score}</span></p>`;
            historyResult.setAttribute('data-id', data.idHistories);
            historyResult.innerHTML = historyResultHtml;
        }
    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

    }
}

document.addEventListener('DOMContentLoaded', async function () {
    let currentUrl = window.location.href;
    let lastSegment = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
    console.log(lastSegment); 

    if (document.querySelector('#main-content')) {
        await renderQuestionTpl();
        let answersButton = document.querySelectorAll('.answer__answer-item input');
        Array.from(answersButton).forEach(answerButton => {
            answerButton.addEventListener("change", function () {
                let listAnswerEle = parents(this, '.answer__list'),
                    itemAnswerEle = parents(this, '.answer__answer-item'),
                    itemQuestionEle = parents(this, '.mid-content__answer'),
                    checkAnswer = false;
                if (!listAnswerEle[0].classList.contains('active')) {
                    listAnswerEle[0].classList.add('active')
                    if (this.parentElement.classList.contains('active')) {
                        this.parentElement.classList.add('show-answer');
                        checkAnswer = true
                    } else {
                        this.parentElement.classList.add('wrong');
                        listAnswerEle[0].querySelector('.answer__answer-item.active').classList.add('show-answer')
                    }
                    arrAnswer.push({
                        id: itemQuestionEle[0].dataset.id,
                        answerList: [parseInt(itemAnswerEle[0].dataset.id)],
                        isCorrect: checkAnswer
                    });
                    localStorage.setItem(part, JSON.stringify(arrAnswer));
                }
            });
        });
        document.getElementById('back-question').addEventListener('click', function () {
            let itemQuestion = document.querySelectorAll('.mid__item'),
                itemQuestionActive = document.querySelector('.mid__item.active'),
                index = parseInt(itemQuestionActive.dataset.index) - 1;
            if (index >= 0) {
                itemQuestionActive.classList.remove('active');
                itemQuestion[index].classList.add('active');
                document.querySelector('#question-number').textContent = index + 1;
            }
        });
        document.getElementById('next-question').addEventListener('click', async function () {
            let itemQuestion = document.querySelectorAll('.mid__item'),
                itemQuestionActive = document.querySelector('.mid__item.active'),
                index = parseInt(itemQuestionActive.dataset.index) + 1;
            itemQuestionActive.querySelectorAll('.mid-content__answer').forEach((item) => {
                if (!item.querySelectorAll('.answer__answer-item.show-answer').length) {
                    arrAnswer.push({
                        id: item.dataset.id,
                        answerList: JSON.stringify([]),
                        isCorrect: false
                    });
                    localStorage.setItem(part, JSON.stringify(arrAnswer));
                }
            })
            if (itemQuestion[index]) {
                itemQuestionActive.classList.remove('active');
                itemQuestion[index].classList.add('active');
                document.querySelector('#question-number').textContent = index + 1;
            } else {
                const template = document.getElementById('template-exam-success').innerHTML,
                    bodyEle = document.querySelector('body');
                bodyEle.classList.remove('age-question-detail');
                bodyEle.classList.add('page-exam-success');
                bodyEle.innerHTML = template;
                let response = await postAjax("http://127.0.0.1:8080/api/v1/histories", JSON.stringify({
                    type: part,
                    amountQuestionGroup: JSON.parse(localStorage.getItem(part)).length,
                    questionList: JSON.parse(localStorage.getItem(part))
                }), localStorage.getItem('access_token'));
                if (response.status >= 200 && response.status < 300) {
                    bodyEle.querySelector('.exam-success__notify').setAttribute('style', 'display:none');
                    bodyEle.querySelector('#result-label').textContent =  (response.data['score']/10*response.data['amountQuestionGroup']).toFixed(0)+'/'+response.data['amountQuestionGroup'];
                    bodyEle.querySelector('#percent-result').textContent = (response.data['score']/10*100).toFixed(2)+'%';
                    bodyEle.querySelector('.percent__result').setAttribute('style', 'width:'+response.data['score']/10*100+'%');
                }
            }
        });
    } else if (document.querySelector('#history-result')) {
        await renderHistoryResultTpl();
        document.getElementById('btn-start-exam').addEventListener('click', function () {
            window.location.href = '/question/question?qty=' + document.getElementById('select-qty-question').value + '&part=' + part;
        });
    }
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

async function getAjax(url, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        if (token) {
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status);
                }
            }
        };

        xhr.onerror = function () {
            reject("Request failed");
        };

        xhr.send();
    });
}

async function postAjax(url, jsonData, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status);
                }
            }
        };
        xhr.send(jsonData);
    });
}

let mainElement = document.getElementById("main");
let questionGroup = [];
let questionTotal = 0;
let arrAnswer = [],part="part4";
let checkAuth = checkAccount();
if(checkAuth)renderIntroPage();

// ----------------------------------------Ren Page-----------------------------------------------
function renderIntroPage()
{
    mainElement.innerHTML=renderHtmlIntroPage();
    renEventListenerForIntroPage();
}
async function renPageResult()
{
    const template = `
        <div class="page-container">
            <div class="page__content">
                <div class="page__exam-success">
                    <div class="exam-success__top">
                        <img src="/static/img/icons/success.png" alt="">
                        <b>Chúc mừng</b>
                        <span>Bạn đã hoàn thành bài luyện tập của mình</span>
                    </div>
                    <div class="exam-success__bottom">
                        <div class="exam-success__notify">
                            <img src="/static/img/icons/warning_c.png" alt="">
                            <p>Bạn cần <span>Đăng nhập</span> để lưu lại lịch sử học tập</p>
                        </div>
                        <div class="exam-success__result">
                            <b>Kết quả: <span id="result-label"></span></b>
                            <div class="result__popup">
                                <div class="result-popup__top">
                                    <span>Tỷ lệ dúng</span>
                                    <span id="percent-result">0%</span>
                                </div>
                                <div class="result-popup__percent">
                                    <div class="percent__result" style="width: 0"></div>
                                </div>
                                <b>Hãy cố gắng nhiều hơn nữa nhé!</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page__footer page__footer--success">
                <div class="footer__action">
                    <a class="btn btn--continue" href="/result">Xem kết quả</a>
                    <a class="btn btn--continue" id="btn-continue" href="/home">Tiếp tục</a>
                    <a class="btn btn--action" href="javascript:location.reload()" id="btn-replay">Làm lại</a>
                </div>
            </div>
        </div>
    `;
    mainElement.innerHTML=template;
    mainElement.classList.remove('page-question-detail');
    mainElement.classList.add('page-exam-success');
    let response = await postAjax("http://127.0.0.1:8080/api/v1/histories", JSON.stringify({
        type: part,
        amountQuestionGroup:  parseInt(questionTotal, 10),
        questionList: JSON.parse(localStorage.getItem(part))
    }), localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        let data =response.data.data;
        document.querySelector('.exam-success__notify').setAttribute('style', 'display:none');
        document.querySelector('#result-label').textContent =  (data['score']/10*data['amountQuestionGroup']).toFixed(0)+'/'+data['amountQuestionGroup'];
        document.querySelector('#percent-result').textContent = (data['score']/10*100).toFixed(2)+'%';
        document.querySelector('.percent__result').setAttribute('style', 'width:'+data['score']/10*100+'%');
    }
}
async function renPageLesson() {
    localStorage.removeItem(part);
    mainElement.innerHTML = renHtmlQuestions();
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbypart?count=' + questionTotal + '&part='+part);
    console.log("render Question: ",response);
    if (response.status >= 200 && response.status < 300) {
        questionTotal = response.data.data.length;
        let questionItemsHtml = response.data.data.map((item, index) => {
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
                                <span class="checkmark"></span>${String.fromCharCode(65 + indexAnswer)}
                            </label>`;
                })
                let questionLabel = question.question || 'Câu ' + (indexQuestion + 1) + ':';
                answersHtml += `<div class="mid-content__answer" data-id="${question.idQuestion}">`
                answersHtml +=`<div class="answer__label">${questionLabel}</div>`;
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
                    <div class="explain nondisplay" >
                        <div class="tab">
                            <div class="flex gap-1 list-tab">
                                <span class="active">Phụ đề</span><span class="">Giải thích</span>
                            </div><span class="close-explain"><b>×</b></span>
                        </div>
                        <div class="content">
                            <div>
                                ${item.questionList[0].explanation}
                            </div>
                        </div>
                    </div>
                </div>`;
        }).join('');
        document.getElementById('main-content').querySelector('#listQuestions').innerHTML += questionItemsHtml;
        renEventListenerForLesson();
        mainElement.classList.add('page-question-detail');
    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

    }
}



// -----------------------------------------Page Intro ----------------------------------------------
async function renderHistoryResultTpl() {
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/lessonbypart?size=1&page=0&type='+part ,localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        let data = response.data.data;
        let historyResult = document.getElementById('history-result');
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
function renderHtmlIntroPage()
{
    return `
        <div class="page-container">
            <div class="page__header">
                <a class="header__left" href="/home">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                        </g>
                    </svg>
                    <div class="header__title">Part 4. Bài nói chuyện ngắn</div>
                </a>
            </div>
            <div class="page__content">
                <div class="page-content__top">
                    <div class="top__icon">
                        <img src="/static/home/img/icons/part4.png" alt="">
                    </div>
                    <div class="top__content" id="history-result" data-id="undefined"><p>Số câu đã làm: <span>1</span></p>
                    <p>Score: <span>3.33333</span></p></div>
                </div>
                <div class="page-content__mid">
                    <h4>Câu hỏi:</h4>
                    <b>You will hear some talks given by a single speaker. You will be asked to answer three questions about
                        what the speaker says in each talk. Select the best response to each question and mark the letter (A),
                        (B), (C), or (D) on your answer sheet. The talks will not be printed in your test book and will be
                        spoken only one time.</b>
                    <p>Hướng dẫn: Bạn sẽ nghe một số bài nói được trình bày bởi một diễn giả. Bạn sẽ được yêu cầu trả lời ba câu
                        hỏi về những gì diễn giả nói trong mỗi bài nói. Chọn câu trả lời đúng nhất cho mỗi câu hỏi và đánh dấu
                        chữ cái (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Các bài nói sẽ không được in trong tập kiểm
                        tra của bạn và sẽ chỉ được nói một lần.</p>
                </div>
                <div class="page-content__bottom">
                    <div class="bottom__label">Chọn số lượng câu hỏi.</div>
                    <label class="bottom__select">
                        <select id="select-qty-question">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </label>
                    <div class="btn btn--action" id="btn-start-exam">Bắt đầu ▸</div>
                </div>
            </div>
        </div>
    `;
}

function renEventListenerForIntroPage()
{
    renderHistoryResultTpl();
    document.getElementById('btn-start-exam').addEventListener("click",()=>{
        console.log("number of question group: ", document.getElementById('select-qty-question').value);
        questionTotal = document.getElementById("select-qty-question").value;
        renPageLesson();
    })
}



// -----------------------------------------Page Question ----------------------------------------------
function renHtmlQuestions()
{
    return `
        <div class="page-container">
            <div class="page__header">
                <a class="header__left" id="back-page" href="1">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path
                                d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                                fill="#FFFFFF"></path>
                        </g>
                    </svg>
                    <div class="header__title" id="show-label-part">Part 1</div>
                </a>
                <div class="header__right">
                    <div class="header__img">
                        <img src="/static/home/img/icons/warning.png">
                    </div>
                    <div class="header__img">
                        <img src="/static/home/img/icons/settings.png">
                    </div>
                    <span id="explain">Giải thích</span>
                </div>
            </div>
            <div id="main-content">
                <div class="page__content">
                    <div class="page-content__top">
                        <div class="top__title">Câu <span id="question-number">1</span></div>
                        <div class="top__action">
                            <div class="btn btn--action" id="back-question">Câu trước</div>
                            <div class="btn btn--action" id="next-question">Câu tiếp</div>
                        </div>
                    </div>
                    <div class="page-content__mid" id="listQuestions">
                        
                    </div>
                </div>
            </div>
        </div>
    `;
}
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

function renEventListenerForLesson()
{
    // ---- ẩn hiện giải thich --------
    let closeLstExplainElement = document.querySelectorAll(".close-explain");
    
    closeLstExplainElement.forEach((closeExplainElement)=>{
        closeExplainElement.addEventListener("click",()=>{
            let explainElement = closeExplainElement.closest(".explain");
            explainElement.classList.add("nondisplay");
        })
    });
     
    let openExplainElement = document.getElementById("explain");
    openExplainElement.addEventListener("click",(e)=>{
        let elementExplain=document.querySelector(".mid__item.active .explain");
        console.log(elementExplain)
        if(elementExplain.classList.contains("nondisplay"))elementExplain.classList.remove("nondisplay");
        else elementExplain.classList.add("nondisplay");
    })

    // ---- sự kiện chọn đáp án --------
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
                    if(listAnswerEle[0].querySelector('.answer__answer-item.active'))
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



    // ---- sự kiện back câu -----------
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
    // ---- sự kiện next câu -----------
    document.getElementById('next-question').addEventListener('click', async function () {
        let itemQuestion = document.querySelectorAll('.mid__item'),
            itemQuestionActive = document.querySelector('.mid__item.active'),
            index = parseInt(itemQuestionActive.dataset.index) + 1;
        itemQuestionActive.querySelectorAll('.mid-content__answer').forEach((item) => {
            if (!item.querySelectorAll('.answer__answer-item.show-answer').length) {
                arrAnswer.push({
                    id: item.dataset.id,
                    answerList: [],
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
           renPageResult();
        }
    });
}

// -----------------------------------------Page Result ----------------------------------------------

function renEventListenerForResult(data)
{

}
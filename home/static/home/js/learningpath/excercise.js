let mainElement = document.getElementById("main");
let checkAuth;
start();
async function start()
{
    checkAuth = await checkAccount();
    if(checkAuth)
    {
        renExcersizePage();
    }
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
function linkTo(url)
{
    window.location.href=url;
}
async function renExcersizePage()
{
    mainElement.innerHTML = renHtmlForFirsrExcersizePage();
    mainElement.classList.add("page-question-detail");
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/118`,localStorage.getItem("access_token"));
    console.log("render Exams: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let htmlQs=response.data.data.questionList.map((question,idxQuestion)=>{
            let htmlAns= question.answerList.map((answer,idxAnswer)=>{
                return `
                    <label class="answer__answer-item ${answer.isCorrect?'active':''} " data-index="0" data-id="${answer.idAnswer}">
                        <input type="radio" name="radio" value="${answer.idAnswer}">
                        <span class="checkmark"></span>${answer.answer}
                    </label>
                `;
            }).join('');
            return `
            <div>
                <div class="answer__label ">${question.question}</div>
                <div class="answer__list">
                   ${htmlAns}
                </div>
            </div>`;
        }).join('')
        document.getElementById('listQuestions').innerHTML=htmlQs;
    }
    let answersButton = document.querySelectorAll('.answer__answer-item input');
    answersButton.forEach(answerButton => {
        answerButton.addEventListener("change", function () {
            let selectedAnswer = this.parentElement;
            
            if (selectedAnswer.closest(".answer__list").classList.contains("active")) {
                return; 
            }
            
            if (!selectedAnswer.classList.contains("active")) {
                selectedAnswer.classList.add("wrong");
            }
    
            selectedAnswer.closest('.answer__list').querySelector(".answer__answer-item.active").classList.add("choose-answer");
            
            selectedAnswer.closest(".answer__list").classList.add("active");
        });
    });
    
    

}
function renHtmlForFirsrExcersizePage()
{
    return `
        <div class="page-container">
            <div class="page__header">
                <a class="header__left" id="back-page" onclick="linkTo('/home')">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
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
                        
                    </div>
                    <div class="page-content__mid" id="listQuestions">
                    </div>
                    
                </div>
                </div>
                </div>
            </div>
        </div>
    `;
}
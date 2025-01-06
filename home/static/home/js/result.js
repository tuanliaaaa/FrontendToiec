let mainElement = document.getElementById('main');
let nowIndex;
let checkAuth,questionGroupTotal;
let idHistory;
start();
async function start() {
    checkAuth = await checkAccount();
    if(checkAuth)renResultPage();
}

//---------------------------- ren Page ---------------------------------
async function renResultPage(){
    mainElement.innerHTML = renHtmlFirstForPageReuslt();
    nowIndex=0;
    idHistory=  window.location.pathname.match(/\/histories\/part\/(\d+)/)[1];
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/lessonbypart/'+idHistory,localStorage.getItem("access_token"));
    console.log("render History: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        questionGroupTotal=response.data.data.questionGroups.length;
        let resultHtml ="", answerResultHtml="";
        response.data.data.questionGroups.map((item,index)=>{
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
                let answerResultItemHtml=``;
                let checkSelected = false;
                question.answerList.forEach((answer, indexAnswer) => {
                    answerItemsHtml += `<label class="answer__answer-item ${(answer.isUserSelect ? 'show-answer active'  : (answer.isCorrect ? 'wrong' : ''))}" data-index="${indexAnswer}" data-id="${answer.idAnswer}">
                                <input type="radio" name="radio">
                                <span class="checkmark"></span>${String.fromCharCode(65 + indexAnswer)}
                            </label>`;
                    answerResultItemHtml+=`
                        <div class="item__answer ${(answer.isUserSelect ? 'item__answer--correct'  : (answer.isCorrect ? 'item__answer--wrong' : ''))}">${String.fromCharCode(65 + indexAnswer)}</div>
                    `;
                    if(answer.isUserSelect)checkSelected=true;
                })

                answerResultHtml+=`
                    <div class="list-question__item" data-index="${index}">
                        <div class="item__left">
                            <img src="${!checkSelected?'/static/home/img/icons/warning_c.png':(question.isCorrect?'/static/home/img/icons/check.png':'/static/home/img/icons/close.png')}">
                            <span>Câu ${indexQuestion+1}</span>
                        </div>
                        <div class="item__right">
                            ${answerResultItemHtml}
                        </div>
                    </div>
                `;

                let questionLabel = question.question || 'Câu ' + (index + 1) + ':';
                answersHtml += `<div class="mid-content__answer" data-id="${question.idQuestion}">`
                answersHtml +=`<div class="answer__label">${questionLabel}</div>`;
                answersHtml +=    `<div class="answer__list">
                        ${answerItemsHtml}
                    </div>
                </div>`;
            });
            resultHtml+= `
                <div class="mid__item nondisplay" data-index="${index}" >
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
        })
        document.getElementById("listQuestions").innerHTML=resultHtml;
        document.getElementById("qsLstItem").innerHTML = answerResultHtml;
        renEvenListenerPageResult();
    }
}
function renHtmlFirstForPageReuslt()
{
    return `
    <div id="result"  >
        <div class="page-container">
            <div class="page__header">
                <a class="header__left" href="/home">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                                fill="#FFFFFF"/>
                        </g>
                    </svg>
                    <div class="header__title">Hiển thị đáp án</div>
                </a>
            </div>
            <div class="page__content">
                <div class="page-content__top">
                    <div class="top__menu-list">
                        <div class="menu-list__item menu-list__item--active" data-type="result__list-question--all">Tất cả</div>
                    </div>
                </div>
                <div class="page-content__mid">
                    <div class="result__list-question result__list-question--all" id="qsLstItem">
                        
                    </div>
                </div>
            </div>
            <div class="page__footer page__footer--result">
                <span>Click vào đáp án để xem giải thích chi tiết </span>
                <img src="/static/home/img/icons/close.png">
            </div>
        </div>
        
    </div>
    <div id = "listQuestionPage" class="nondisplay">
        <div class="page-container">
            <div class="page__header">
                <a class="header__left" id="back-page" href="1">
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

function renEvenListenerPageResult(){
    document.getElementById("back-question").addEventListener("click",()=>{
        document.querySelector(`.mid__item[data-index="${nowIndex}"]`).classList.add("nondisplay");
        if(nowIndex==0)
        {
            document.getElementById("result").classList.remove("nondisplay");
            document.getElementById("listQuestionPage").classList.add("nondisplay");
        }else{
            nowIndex--;
            document.querySelector(`.mid__item[data-index="${nowIndex}"]`).classList.remove("nondisplay");
        }
        document.getElementById("question-number").innerText=nowIndex+1;

    })
    document.getElementById("next-question").addEventListener("click",()=>{
        if(nowIndex==questionGroupTotal-1)
        {

        }else{
            document.querySelector(`.mid__item[data-index="${nowIndex}"]`).classList.add("nondisplay");
            nowIndex++;
            document.querySelector(`.mid__item[data-index="${nowIndex}"]`).classList.remove("nondisplay");
            document.getElementById("question-number").innerText=nowIndex+1;
        }
    })
    document.querySelectorAll(".list-question__item").forEach((qItem,indexQItem)=>{
        qItem.addEventListener("click",(evt)=>{
            // console.log("list-question__item cliked:",evt.currentTarget.dataset.index);
            document.getElementById("result").classList.add("nondisplay");
            document.getElementById("listQuestionPage").classList.remove("nondisplay");
            nowIndex=parseInt(evt.currentTarget.dataset.index);
            document.querySelector(`.mid__item[data-index="${nowIndex}"]`).classList.remove("nondisplay");
            document.getElementById("question-number").innerText=nowIndex+1;

        })
    })
}

function renderHistoryOfUser(idHistory)
{
         
}
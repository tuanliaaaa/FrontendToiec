let mainElement = document.getElementById('main');
let checkAuth = checkAccount();
if(checkAuth)renResultPage();

//---------------------------- ren Page ---------------------------------
function renResultPage(){
    mainElement.innerHTML = renHtmlFirstForPageReuslt();
}
function renHtmlFirstForPageReuslt()
{
    return `
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
                    <div class="result__list-question result__list-question--all">
                        <div class="list-question__item">
                            <div class="item__left">
                                <img src="/static/home/img/icons/warning_c.png">
                                <span>Câu 2</span>
                            </div>
                            <div class="item__right">
                                <div class="item__answer item__answer--correct">A</div>
                                <div class="item__answer">B</div>
                                <div class="item__answer">C</div>
                                <div class="item__answer">D</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page__footer page__footer--result">
                <span>Click vào đáp án để xem giải thích chi tiết </span>
                <img src="/static/home/img/icons/close.png">
            </div>
        </div>
    `;
}


const buttonMenus = document.getElementsByClassName('menu-list__item');
const resultContentTabs = document.getElementsByClassName('result__list-question');

Array.from(buttonMenus).forEach(buttonMenu => {
    buttonMenu.addEventListener("click", function () {
        Array.from(buttonMenus).forEach(btn => btn.classList.remove('menu-list__item--active'));
        Array.from(resultContentTabs).forEach(tab => tab.style.display = "none");
        if (document.getElementsByClassName(this.getAttribute('data-type')).length) {
            document.getElementsByClassName(this.getAttribute('data-type'))[0].style.display = "block";
        }
        this.classList.add('menu-list__item--active');
    });
});

function renderQuestion(idQuestion,part,idAnswerCorrect,idAnswerUserSelected){
    if(part=="part1"){
        return `
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
                        <div class="header__title" id="show-label-part">part1</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--audio" data-id="1">
                                        <audio controls="">
                                            <source src="https://api.scandict.com/uploads/audios/74_1_65c0a3d72febd.mp3" type="audio/mpeg">
                                        </audio>
                                    </div><div class="mid-content__left mid-content__left--img" data-id="2">
                                        <img src="https://api.scandict.com/uploads/images/74_1_65c0a3d443c75.png">
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="1"><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="1">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A.
                                        </label><label class="answer__answer-item " data-index="1" data-id="2">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B.
                                        </label><label class="answer__answer-item " data-index="2" data-id="3">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C.
                                        </label><label class="answer__answer-item " data-index="3" data-id="4">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D.
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }else if(part=="part2"){
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="2">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part2</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--audio" data-id="13">
                                        <audio controls="">
                                            <source src="https://api.scandict.com/uploads/audios/74_2_65c0a60d4316e.mp3" type="audio/mpeg">
                                        </audio>
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="7"><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="25">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A.
                                        </label><label class="answer__answer-item active" data-index="1" data-id="26">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B.
                                        </label><label class="answer__answer-item " data-index="2" data-id="27">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C.
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }else if(part=="part3"){
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="3">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part3</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--audio" data-id="38">
                                        <audio controls="">
                                            <source src="https://s4-media1.study4.com/media/tez_media/sound/eco_toeic_1000_test_1_32_34.mp3" type="audio/mpeg">
                                        </audio>
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="32"><div class="answer__label">32. What are the speakers mainly discussing?</div><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="100">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. A training seminar.
                                        </label><label class="answer__answer-item " data-index="1" data-id="101">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. The installation of a television.
                                        </label><label class="answer__answer-item " data-index="2" data-id="102">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. The date of a presentation.
                                        </label><label class="answer__answer-item " data-index="3" data-id="103">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. A software upgrade.
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="33"><div class="answer__label">33. What is the problem?</div><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="104">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. The necessary tools are unavailable.
                                        </label><label class="answer__answer-item " data-index="1" data-id="105">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. The office is closed.
                                        </label><label class="answer__answer-item " data-index="2" data-id="106">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. The wall is too weak.
                                        </label><label class="answer__answer-item " data-index="3" data-id="107">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. The phone number was wrong.
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="34"><div class="answer__label">34. What most likely will the man do first tomorrow?</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="108">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. Order a replacement part.
                                        </label><label class="answer__answer-item " data-index="1" data-id="109">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. Consult an instruction manual.
                                        </label><label class="answer__answer-item active" data-index="2" data-id="110">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. Contact the woman.
                                        </label><label class="answer__answer-item " data-index="3" data-id="111">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. Fill out a work order.
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;

    }else if(part=="part4"){
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="4">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part4</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--audio" data-id="54">
                                        <audio controls="">
                                            <source src="https://s4-media1.study4.com/media/tez_media/sound/eco_toeic_1000_test_1_71_73.mp3" type="audio/mpeg">
                                        </audio>
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="71"><div class="answer__label">71. Where most likely does the speaker work?</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="268">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. At a theater.
                                        </label><label class="answer__answer-item " data-index="1" data-id="269">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. At a car dealership.
                                        </label><label class="answer__answer-item active" data-index="2" data-id="270">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. At a retail store.
                                        </label><label class="answer__answer-item " data-index="3" data-id="271">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. At a library.
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="72"><div class="answer__label">72. What is the listener asked to double-check?</div><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="272">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. Accurate prices.
                                        </label><label class="answer__answer-item " data-index="1" data-id="273">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. Sales figures.
                                        </label><label class="answer__answer-item " data-index="2" data-id="274">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. Business hours.
                                        </label><label class="answer__answer-item " data-index="3" data-id="275">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. Name tags.
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="73"><div class="answer__label">73. When should the listener contact the speaker?</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="276">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. If an employee is late for work.
                                        </label><label class="answer__answer-item " data-index="1" data-id="277">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. If a technical problem occurs.
                                        </label><label class="answer__answer-item " data-index="2" data-id="278">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. If an item is out of stock.
                                        </label><label class="answer__answer-item active" data-index="3" data-id="279">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. If a customer is dissatisfied.
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }
    else if(part=="part5"){
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="5">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part5</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="101"><div class="answer__label">101. When filling out the order form, please _____ your address clearly to prevent delays.</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="388">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. fix
                                        </label><label class="answer__answer-item active" data-index="1" data-id="389">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. write
                                        </label><label class="answer__answer-item " data-index="2" data-id="390">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. send
                                        </label><label class="answer__answer-item " data-index="3" data-id="391">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. direct
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }else if(part=="part6"){
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="6">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part6</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--img" data-id="67">
                                        <img src="https://zenlishtoeic.vn/wp-content/uploads/2024/01/zenlish-31-34-4.jpg">
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="142"><div class="answer__label">131. </div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="556">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. is
                                        </label><label class="answer__answer-item " data-index="1" data-id="557">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. or
                                        </label><label class="answer__answer-item active" data-index="2" data-id="558">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. likely
                                        </label><label class="answer__answer-item " data-index="3" data-id="559">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. from
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="143"><div class="answer__label">132. </div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="560">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. our
                                        </label><label class="answer__answer-item " data-index="1" data-id="561">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. ourselves
                                        </label><label class="answer__answer-item active" data-index="2" data-id="562">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. ours
                                        </label><label class="answer__answer-item " data-index="3" data-id="563">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. us
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="144"><div class="answer__label">133. </div><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="564">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. Contact a technician for questions about repairs.
                                        </label><label class="answer__answer-item " data-index="1" data-id="565">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. A high-quality instrument will help you to perform at your best.
                                        </label><label class="answer__answer-item " data-index="2" data-id="566">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. The best resource for you as a learner is an expert to guide your progress.
                                        </label><label class="answer__answer-item " data-index="3" data-id="567">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. It took them several years to master their instruments.
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="145"><div class="answer__label">134. </div><div class="answer__list">
                                    <label class="answer__answer-item active" data-index="0" data-id="568">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. So far
                                        </label><label class="answer__answer-item " data-index="1" data-id="569">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. With that in mind
                                        </label><label class="answer__answer-item " data-index="2" data-id="570">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. On a different note
                                        </label><label class="answer__answer-item " data-index="3" data-id="571">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. At that point
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }else{
        return `
            <div class="page-container">
                <div class="page__header">
                    <a class="header__left" id="back-page" href="7">
                        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                            </g>
                        </svg>
                        <div class="header__title" id="show-label-part">part7</div>
                    </a>
                    <div class="header__right">
                        <div class="header__img">
                            <img src="/static/home/img/icons/warning.png">
                        </div>
                        <div class="header__img">
                            <img src="/static/home/img/icons/settings.png">
                        </div>
                        <span>Giải thích</span>
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
                            <div class="mid__item active" data-index="0" style="display: none">
                                <div class="mid__content mid__content--left">
                                    <div class="mid-content__left mid-content__left--img" data-id="71">
                                        <img src="https://zenlishtoeic.vn/wp-content/uploads/2024/01/zenlish-147-148.jpg">
                                    </div>
                                </div>
                                <div class="mid__content mid__content--right">
                                    <div class="mid-content__answer" data-id="158"><div class="answer__label">147. Where is the information most likely found?</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="620">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. On a door
                                        </label><label class="answer__answer-item " data-index="1" data-id="621">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. On a receipt
                                        </label><label class="answer__answer-item active" data-index="2" data-id="622">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. In a box
                                        </label><label class="answer__answer-item " data-index="3" data-id="623">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. On a Web site
                                        </label>
                                </div>
                            </div><div class="mid-content__answer" data-id="159"><div class="answer__label">148. What kind of item is most likely discussed?</div><div class="answer__list">
                                    <label class="answer__answer-item " data-index="0" data-id="624">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>A. A desktop computer
                                        </label><label class="answer__answer-item active" data-index="1" data-id="625">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>B. A piece of furniture
                                        </label><label class="answer__answer-item " data-index="2" data-id="626">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>C. A household appliance
                                        </label><label class="answer__answer-item " data-index="3" data-id="627">
                                            <input type="radio" name="radio">
                                            <span class="checkmark"></span>D. A power tool
                                        </label>
                                </div>
                            </div>
                                </div>
                            </div></div>
                </div>
            </div>
            </div>
        `;
    }
}
// let a = setInterval(async() => {
//     let randomPart = Math.floor(Math.random() * 7) + 1;  // Sinh số từ 1 đến 7
//     console.log(randomPart);
//     document.querySelector("body").innerHTML=renderQuestion(1,"part"+randomPart);
//     await sleep(10000);
// }, 500);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function renderHistoryOfUser(idHistory)
{

}
let mainElement = document.getElementById("main");

let checkAuth;
start();
async function start()
{
    checkAuth = await checkAccount();
    if(checkAuth) renPageExams();
}

async function renPageExams()
{
    mainElement.innerHTML= renHtmlFirstForExamsPage();
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/exams`,localStorage.getItem("access_token"));
    console.log("render Exams: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let htmlExams=response.data.data.map((exam,index)=>{
            return`
                <li class="page-topic__item">
                    <a href="/exam/${exam.idExam}">
                        <b class="item-topic__name">${exam.examName}</b>
                        <div class="item-topic__content">
                            <span>Câu hỏi:<b>200</b></span>
                            <span>Thời gian:<b>120 phút</b></span>
                        </div>
                        <div class="item-topic__action">
                            <span class="btn btn--action">Full test</span>
                        </div>
                    </a>
                </li>
            `;
        }).join('');
        document.getElementById("lstExam").innerHTML=htmlExams;
    }
    renEvenListenerForExamsPage();
}
function renHtmlFirstForExamsPage()
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
                    <div class="header__title">Toeic Max - Học từ vựng</div>
                </a>
            </div>
            <div class="page__content">
                <div class="page__topic">
                    <div class="page-topic__block">
                        <div class="page-topic__label">
                            <span class="label__name">ETS Free</span>
                            <div class="label__icon">
                                <img src="/static/home/img/icons/arrow-down.png">
                            </div>
                        </div>
                        <ul class="page-topic__list" id="lstExam">
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renEvenListenerForExamsPage()
{
    document.querySelector(".page-topic__item").addEventListener("click",(e)=>{
        window.location='/exam';
    })
}
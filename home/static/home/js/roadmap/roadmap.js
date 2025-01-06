let checkAuth;
let mainElement = document.getElementById("main");
async function start()
{
    checkAuth = await checkAccount();
    if(checkAuth) renPageRoadmap();
}
start();

async function renPageRoadmap()
{
    mainElement.innerHTML=renHtmlFirstForPageRoadmap();
    let his = await getHistorieVocabularyOfUser();
    console.log("his: ",his);
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps',localStorage.getItem("access_token"));
    console.log("render Roadmap: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let htmlListDay=response.data.data.map((day,idxDay)=>{
            let checkProcess=false;
            let htmlGrammar = day.grammars.map((grammar,idxGrammar)=>{
                console.log(grammar.idDetail);
                if(his[grammar.idDetail]){
                    checkProcess=true;
                }
                return  `
                    <li><img src="${his[grammar.idDetail]?'/static/home/img/icons/tick.png':'https://vi.toeicmax.com/icon/dot.png'}"> ${grammar.nameLesson}</li>
                `;
            }).join('');
            return `
                <div class="item ${checkProcess&&day.grammars.length!=0?'open':'locked'}" >
                    <p class="day-header">${day.name}</p>
                    <div class="d-flex lesson-inforday">
                        <ul class="lesson" onclick="linkTo('/roadmap/${day.id}')">
                            ${htmlGrammar}
                        </ul>
                    </div>
                </div>
            `;
        });
        document.getElementById("list-day").innerHTML = htmlListDay;
    }
}
function renHtmlFirstForPageRoadmap(){
    return `
        <div id="header">
            <div class="page__header">
                <a class="header__left" href="/vocabulary">
                    <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z" fill="#FFFFFF"></path>
                        </g>
                    </svg>
                    <div class="header__title fs-16" id="lessonName">Bài 1: Contract</div>
                </a>
            </div>
        </div>
        <div id="container">
            <div id="list-day">
                               
             </div>
        </div>
    `;
}

function linkTo(url)
{
    window.location.href=url;
}
async function getHistorieVocabularyOfUser()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/learningpaths?size=1&page=0',localStorage.getItem("access_token"));
    console.log("render History Roadmap: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let data ={};
        response.data.data[0]['historyDetails'].forEach(element => {
            data[element.idLessonDetail]=element;
        });
        return data;
    }
}

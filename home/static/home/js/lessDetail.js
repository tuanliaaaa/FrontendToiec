let urlPath = window.location.pathname; 
let idGrammar = urlPath.split('/').pop();
function start()
{
   renderRoadMap();
}
start();


function linkTo(url)
{
    window.location.href=url;
}
async function renderRoadMap() {
    
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/grammas/'+idGrammar);
    console.log("render Roadmap",response);
    if (response.status >= 200 && response.status < 300) {
       document.getElementById("introduction").innerHTML=response.data.data.content;
       postHistoryLearningPath();

    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
 
    }
    let responseExcercise = await getAjax(`http://127.0.0.1:8080/api/v1/roadmaps/grammas/${idGrammar}/excercise`);
    console.log("render responseExcercise: ",responseExcercise);
    if (responseExcercise.status >= 200 && responseExcercise.status < 300) {
        let htmlQs= responseExcercise.data.data.map((questionGroup,idxQuestionGroup)=>{
            return `
                <div class="day-box" data-index="QuestionGroup-${idxQuestionGroup+1}" onclick="linkTo('/roadmapdetail/${idGrammar}/excercise/${questionGroup.groupQuestionId}')">
                    <div
                        class="day-box__header d-flex justify-content-between align-items-center">
                        <p>Question 1: <span> ${questionGroup.value}</span></p>
                    </div>
                </div>
            `;
        }).join('');
       document.getElementById("studyPlan").innerHTML=htmlQs;
       postHistoryLearningPath();
    }
    renEventListenerForQuestionPage();
}

function renEventListenerForQuestionPage()
{
    //Move Tab
    let buttonNavTabList = document.querySelectorAll('button[data-index^="navbar-"]');
    buttonNavTabList.forEach(buttonNavTab=>{
        buttonNavTab.addEventListener("click",(e)=>{
            document.querySelector('button[data-index^="navbar-"].active').classList.remove("active")
            e.currentTarget.classList.add('active');
            let dataIndex = e.currentTarget.getAttribute('data-index');
            let suffix = dataIndex.split('-')[1];
            document.querySelector('div[data-nav^="navbar-"]:not(.nondisplay)').classList.add("nondisplay");
            document.querySelector(`div[data-nav="navbar-${suffix}"]`).classList.remove("nondisplay");

        })
    })
   //  eventForBtnQGDetail();
}

async  function postHistoryLearningPath(){
   let response = await postAjax('http://127.0.0.1:8080/api/v1/histories/lessonbypart',
         JSON.stringify({
            lessonDetailId:idGrammar
         }),
         localStorage.getItem("access_token")
   );
    console.log("render Roadmap",response);
}
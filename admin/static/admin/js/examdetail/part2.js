let mainElement = document.getElementById("main");
const idExam = window.location.href.match(/\/exams\/(\d+)\//)[1];
let qsAddNow=7;
let mapQuestionGroup={
    7:null,
    8:null,
    9:null,
    10:null,
    11:null,
    12:null,
    13:null,
    14:null,
    15:null,
    16:null,
    17:null,
    18:null,
    19:null,
    20:null,
    21:null,
    22:null,
    23:null,
    24:null,
    25:null,
    26:null,
    27:null,
    28:null,
    29:null,
    30:null,
    31:null
};
let listQuestionGroup=[];
let listQuestionGroupSearch={};
let part="2",questionTotal=0;
let questionPart=25;
let checkAuth = checkAccount();
if(checkAuth)renPageQuestion();
// ----------------------------------------Ren Page-----------------------------------------------
async function renPageQuestion()
{
    mainElement.innerHTML = renHtmlFirstQuestion();
    mainElement.classList.add("page-question");
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/exams/${idExam}/part/${part}`,localStorage.getItem("access_token"));
    console.log("render Question: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        questionTotal = response.data.data.questionGroups.length;
        let questionItems= response.data.data.questionGroups;

        let indexNow=6,indexquestionItems=0,indexNowQuestionItems=0;
        let questionItemsHtml='';
        while(indexNowQuestionItems<questionTotal&&indexNow<questionPart+6)
        {            
            if(indexNowQuestionItems<questionTotal)
            {
                indexquestionItems = questionItems[indexNowQuestionItems].orderOfQuestionGroup-1;
                mapQuestionGroup[indexquestionItems+1] = questionItems[indexNowQuestionItems].id;
                listQuestionGroup.push(questionItems[indexNowQuestionItems].id);
                indexNowQuestionItems++;
            }
            while(indexquestionItems>indexNow)
            {
                questionItemsHtml+=`
                    <div class="day-box" data-index="QuestionGroup-${indexNow+1}">
                        <div class="day-box__header d-flex justify-content-between align-items-center">
                            <p>Question ${indexNow+1}</p>
                             <div class="group-btn">
                                <button class="btn btn-clear">Clear</button>
                                <button class="btn btn-collapse">
                                    <!-- button save -->
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="day-box__content active">
                    
                        </div>
                    </div>
                `;
                indexNow++;
            }
            questionItemsHtml+=`
                    <div class="day-box" data-index="QuestionGroup-${indexNow+1}">
                        <div class="day-box__header d-flex justify-content-between align-items-center">
                            <p>Question ${indexNow+1}</p>
                            <div class="group-btn">
                                <button class="btn btn-clear">Clear</button>
                                <button class="btn btn-collapse">
                                    <!-- button save -->
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div class="day-box__content active">
                            <div class="day-box__content--container d-flex" style="gap: 10px;">
                                <div class="question-answer d-flex justify-content-between align-self-center">
                                    <div class="question-answer__container">
                                        <div class="question">
                                            <input type="text" name="questionInput2" placeholder="Question" value="${questionItems[indexNowQuestionItems-1].questionList[0].question}">
                                        </div>
                                        <div class="answer">
                    `;
                
            questionItems[indexNowQuestionItems-1].questionList[0].answerList.map((item,index)=>{
                questionItemsHtml+=`
                        <div class="answer-group">
                        <input type="radio" name="correctAnswer${indexNowQuestionItems-1}" value=${item.idAnswer} ${item.isCorrect?"checked":""}>
                        <label for="answerInput${indexNowQuestionItems-1}-${index+1}">${String.fromCharCode(65 + index)}</label>
                        <input type="text" name="answer1-${String.fromCharCode(65 + index)}" value="${item.answer}">
                    </div>
                `;
            })

            let htmlResourceImg =``,htmlResourceAudio=``;
            questionItems[indexNowQuestionItems-1].resourceList.forEach((resourceDetail,indexResourceDetail)=>{
                if(resourceDetail.resourceType=='audio')
                    htmlResourceAudio+=`
                        <div class="resource__item" style="flex: 50%;">
                            
                            <input type="file" name="upload-audio" accept="audio/*" class="no-active">
                            <audio controls="" src="${resourceDetail.resourceContent}" style="width: 100%; margin-top: 10px; border-radius: 12px;"></audio>
                        </div>
                    `;
                if(resourceDetail.resourceType=='image')
                    htmlResourceImg+=`
                         <div class="resource__item" style="flex: 50%;">
                            <div class="resource__item--upload-img" style="background-image: url(&quot;${resourceDetail.resourceContent}&quot;); background-size: cover;">
                                
                            </div>
                            <input type="file" name="upload-img" accept="image/*" class="no-active">
                        </div>
                    `;
            })
            questionItemsHtml+=`                       
                                    </div>
                                </div>
                            </div>
                            <div class="resource d-flex" style="gap: 10px;">
                                ${htmlResourceImg}
                                ${htmlResourceAudio}
                            </div>
                        </div>
                    </div>
                </div>
            `;
            indexNow++;
        }
        for(let i =indexNow;i<questionPart+6;i++)
        {
            questionItemsHtml+=`
            <div class="day-box" data-index="QuestionGroup-${i+1}">
                <div class="day-box__header d-flex justify-content-between align-items-center">
                    <p>Question ${i+1}</p>
                    <div class="group-btn">
                        <button class="btn btn-clear">Clear</button>
                        <button class="btn btn-collapse">
                            <!-- button save -->
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>
                </div>
                <div class="day-box__content active">
                    
                </div>
            </div>
        `;
        }

        document.getElementById('studyPlan').innerHTML += questionItemsHtml;
    }
    console.log(mapQuestionGroup);
    renEventListenerForQuestionPage();
}

function renHtmlFirstQuestion(){
    return `
        <div id="header">
            <div id="navbar">
                <div class="divleft"></div>
                <div class="navbar__menu">
                    <div class="menu-item active">
                        <a href="/admin/questiongroups">Quản lý câu hỏi</a>
                    </div>
                    <div class="menu-item">
                        <a href="/admin/exams">Quản lý đề thi</a>
                    </div>
                    <div class="menu-item ">
                        <a href="/admin/vocabulary">Quản lý từ vựng</a>
                    </div>
    
                    <div class="menu-item">
                        <a href="/admin/learningpath">Quản lý lộ trình</a>
                    </div>
                </div>
                <div class="navbar__user">
                    <div class="avatar">
                    </div>
                </div>
            </div>
        </div>
    
        <div id="container">
            <div class="sidebar">
                <h2>Danh mục</h2>
                <ul>
                    <li><a href="/admin/exams/${idExam}/part1" >Part 1</a></li>
                    <li><a href="/admin/exams/${idExam}/part2" class="active">Part 2</a></li>
                    <li><a href="/admin/exams/${idExam}/part3">Part 3</a></li>
                    <li><a href="/admin/exams/${idExam}/part4">Part 4</a></li>
                    <li><a href="/admin/exams/${idExam}/part5">Part 5</a></li>
                    <li><a href="/admin/exams/${idExam}/part6">Part 6</a></li>
                    <li><a href="/admin/exams/${idExam}/part7">Part 7</a></li>
                </ul>
            </div>
    
            <div class="container__content">
                <div class="main-content d-flex">
                    <div class="main-content-qsl">
                        <div class="containner__title align-items-center" style="gap: 10px;">
                            <h2 class="part1__title">Part 2</h2>
                            <div class="question-quantity">
                                <p>Question:
                                    <span>0/25</span>
                                </p>
                            </div>
                        </div>
                        <div class="study-plan" id="studyPlan" >
                            
                        </div>
                    </div>
                    <div id="search" >  
                        <div class="searchHeader d-flex">
                            <div class="group-btn ">
                                <button class="btn btn-save" onclick="addQuestionGroupForExam()">Save</button>
                            </div>
                        </div>
                        <div class="searchBody day-box">
                            <div class="condition d-flex ">
                                <div class="d-flex align-items-center">
                                    <h1 id="qgNowSeach">Câu 7</h1>
                                </div>
                                <div class="condition__search">
                                    <input type="text" placeholder="Tìm kiếm" id="searchQuestion">
                                    <button id="searchBtn"><svg class="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg><!-- <i class="fas fa-search"></i> Font Awesome fontawesome.com --></button>
                                </div>
                            </div>
                            <div id="lstSearchItem">
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function renEventListenerForQuestionPage()
{
    const questionQuantity = document.querySelector('.question-quantity span');
    const questionContainers = document.querySelectorAll('.question-answer__container[id]');
    questionQuantity.textContent = questionTotal + '/' + questionPart;
    // Add Event click to div question group exam
    let questionGroupElements = document.querySelectorAll('div[data-index^="QuestionGroup-"]');

    questionGroupElements.forEach(questionGroupElement => {
        questionGroupElement.addEventListener("click",(e)=>{
            let dataIndex = e.currentTarget.getAttribute('data-index');
            let suffix = dataIndex.split('-')[1];
            document.getElementById("qgNowSeach").innerText="Câu "+suffix;
            qsAddNow= parseInt(suffix);
        })
    });


    eventForBtnQGDetail();


    //Search Question Group
    document.getElementById('searchBtn').addEventListener("click",async ()=>{
        let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/search?value=${document.getElementById('searchQuestion').value}&size=31&type=part2`,localStorage.getItem("access_token"));
        console.log("render Question: ",response.data);
        if (response.status >= 200 && response.status < 300) {
            let htmlQuestionGroups = response.data.data.map((questionGroup,indexQuestionGroup)=>{
            let htmlQuetion = questionGroup.questionList.map((question,indexQuestion)=>{
                    return `<li>${question.question}</li>`
                }).join('');
                listQuestionGroupSearch[questionGroup.id]=questionGroup;
                return !listQuestionGroup.includes(questionGroup.id)?`
                    <div class="itemSearch" data-index="itemSearch-${questionGroup.id}">
                        <div>
                            <h2>Câu ${indexQuestionGroup+1}</h2>
                        </div>
                        <ul>
                            ${htmlQuetion}
                        </ul>
                    </div>
                `:'';
            }).join('');
            document.getElementById('lstSearchItem').innerHTML=htmlQuestionGroups;
        }
        renEventListenerForSearch();
    })
}
function renEventListenerForSearch()
{
    let questionGroupSearchElements = document.querySelectorAll('div[data-index^="itemSearch-"]');

    questionGroupSearchElements.forEach(questionGroupSearchElement => {
        questionGroupSearchElement.addEventListener("click",(e)=>{
            let dataIndex = e.currentTarget.getAttribute('data-index');
            let suffix = dataIndex.split('-')[1];
            let questionGroup = listQuestionGroupSearch[suffix];
            console.log("questionGroup clicked Data: ",questionGroup);
            let htmlQuestionList=questionGroup.questionList.map((question,idxQuestion)=>{
                let htmlAnsList =  question.answerList.map((answer,idxAnswer)=>{
                    return `
                        <div class="answer-group">
                            <input type="radio" name="correctAnswer0" value="1" ${answer.isCorrect?'checked':''}>
                            <label for="answerInput0-1">A</label>
                            <input type="text" name="answer1-A" value="${answer.answer}">
                        </div>
                    `;
                }).join('');
                return `
                    <div class="question-answer__container">
                        <div class="question">
                            <input type="text" name="questionInput2" placeholder="Question" value="${question.question}">
                        </div>
                        <div class="answer">
                            ${htmlAnsList}                            
                        </div>
                    </div>
                `;
            }).join('');
            let htmlResourceAudio='',htmlResourceImg='';
            questionGroup.resourceList.map((resourceDetail,idxResource)=>
            {
                if(resourceDetail.resourceType=='audio')
                    htmlResourceAudio+=`
                        <div class="resource__item" style="flex: 50%;">
                            <input type="file" name="upload-audio" accept="audio/*" class="no-active">
                            <audio controls="" src="${resourceDetail.resourceContent}" style="width: 100%; margin-top: 10px; border-radius: 12px;"></audio>
                        </div>
                    `;
                if(resourceDetail.resourceType=='image')
                    htmlResourceImg+=`
                        <div class="resource__item" style="flex: 50%;">
                            <div class="resource__item--upload-img" style="background-image: url(&quot;${resourceDetail.resourceContent}&quot;); background-size: cover;">
                                
                            </div>
                        </div>
                    `;
            }).join('');
            let qsClickedElement=document.querySelector(`div[data-index="QuestionGroup-${qsAddNow}"]`);
            qsClickedElement.querySelector(".day-box__content").innerHTML=
                `
                    <div class="day-box__content--container d-flex" style="gap: 10px;">
                        <div class="question-answer d-flex justify-content-between align-self-center">
                            ${htmlQuestionList}
                        </div>
                        <div class="resource d-flex" style="gap: 10px;">
                            ${htmlResourceAudio}
                            ${htmlResourceImg}

                        </div>
                    </div>
                `;
            listQuestionGroup = listQuestionGroup.filter(item => item !== mapQuestionGroup[qsAddNow]);
            mapQuestionGroup[qsAddNow]=parseInt(suffix);
            listQuestionGroup.push(parseInt(suffix))
            console.log(mapQuestionGroup);
            document.getElementById('searchBtn').click();
        })
    });
}

async function addQuestionGroupForExam()
{
    let questionGroupListRequest=[];
    for (let key in mapQuestionGroup) {
        if (mapQuestionGroup[key]) {
            questionGroupListRequest.push(
                {
                    idQuestionGroup: mapQuestionGroup[key],
                    orderOfQuestionGroup: parseInt(key)
                }
            )
        }
    }
    console.log("list question group id request for exam: ",questionGroupListRequest);
    let response = await postAjax(`http://127.0.0.1:8080/api/v1/exams/${idExam}?type=part2`,JSON.stringify(questionGroupListRequest),localStorage.getItem("access_token"));
    console.log("render Question: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        window.location.href="/admin/exams/"+idExam+"/part2";
    }
}
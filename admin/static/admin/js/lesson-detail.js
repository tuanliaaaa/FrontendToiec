let idLesson = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
let mainElement = document.getElementById("main")
let listQuestionGroup=[],listQuestionGroupSearch=[],qsAddNow=1,
mapQuestionGroup={},questionGroupCount=0,listQuestionGroupPost=[];
async function start(){
    let checkAuth = await checkAccount("ROLE_ADMIN");
    if(checkAuth)renPageGrammar();
}
start();

function renHtmlForGrammarPageFirst()
{
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
                    <li><a href="/admin/learningpath" >Quản lý lộ trình</a></li>
                    <li><a href="/admin/lesson" class="active">Quản lý bài học</a></li>
                </ul>
            </div>
    
            <div class="container__content">
                <div class="main-content">
                    <div class="containner__title">
                        <div class="helpCenter3"></div>
                        <h2> Quản lý bài học</h2>
                        <div class="helpCenter3">
                            <button class="btn btn-save" onclick="updateLesson()">Save</button>
                        </div>
                    </div>
                    <div class="container__body">
                        <div class="lesson__content">
                            <div class="lesson__navbar">
                                <button data-index="navbar-theory" class="active">Lý thuyết</button>
                                <button data-index="navbar-exercise" >Bài Tập</button>
                            </div>
                        </div>
                        <div class="lesson__body">
                            <div id="theory" data-nav="navbar-theory">
                                <div class="day-box ">
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between ">
                                                <div class="answer">
                                                    <div class="answer-group">
                                                        <label for="topicInput">Tiêu đề</label>
                                                        <input type="text" id="topicInput">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;">
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-doc">
                                                        Upload Doc
                                                    </div>
                                                    <input type="file" name="upload-doc" class="no-active" accept=".doc,.docx" id="uploadFile"/>
                                                    <div class="preview-container" id="preview-container"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="exercise" data-nav="navbar-exercise" class="main-content d-flex overflow-scroll-y nondisplay">
                                <div class="main-content-qsl">
                                    <div class="containner__title align-items-center" style="gap: 10px;">
                                        <h2 class="part1__title">Danh sách bài tập</h2>
                                        
                                    </div>
                                    <div class="questionGroupList" id="studyPlan">
                                        <div class="day-box" data-index="QuestionGroup-1">
                                            <div class="day-box__header d-flex justify-content-between align-items-center">
                                                <p>Question 1</p>
                                                <div class="group-btn">
                                                    <button class="btn btn-clear">Clear</button>
                                                    <button class="btn btn-collapse">
                                                        <!-- button save -->
                                                        <svg class="svg-inline--fa fa-minus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg><!-- <i class="fa-solid fa-minus"></i> Font Awesome fontawesome.com -->
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="day-box__content active">
                                                <div class="day-box__content--container d-flex" style="gap: 10px;">
                                                    <div class="question-answer d-flex justify-content-between align-self-center">
                                                        <div class="question-answer__container">
                                                            <div class="answer">
                                        
                                            <div class="answer-group">
                                                <input type="radio" name="correctAnswer0" value="1" checked="">
                                                <label for="answerInput0-1">A</label>
                                                <input type="text" name="answer1-A" value="A. She’s eating in a picnic area">
                                            </div>
                                    
                                            <div class="answer-group">
                                                <input type="radio" name="correctAnswer0" value="2">
                                                <label for="answerInput0-2">B</label>
                                                <input type="text" name="answer1-B" value="B. She’s waiting in line at a food truck">
                                            </div>
                                    
                                            <div class="answer-group">
                                                <input type="radio" name="correctAnswer0" value="3">
                                                <label for="answerInput0-3">C</label>
                                                <input type="text" name="answer1-C" value="C. She’s wiping off a bench.">
                                            </div>
                                    
                                            <div class="answer-group">
                                                <input type="radio" name="correctAnswer0" value="4">
                                                <label for="answerInput0-4">D</label>
                                                <input type="text" name="answer1-D" value="D. She’s throwing away a plate.">
                                            </div>
                                                        
                                        </div>
                                    </div>
                                        </div>
                                    </div>
                                </div>
                                        </div>
                                        <div class="day-box" data-index="QuestionGroup-2">
                                            <div class="day-box__header d-flex justify-content-between align-items-center">
                                                <p>Question 1</p>
                                                <div class="group-btn">
                                                    <button class="btn btn-clear">Clear</button>
                                                    <button class="btn btn-collapse">
                                                        <!-- button save -->
                                                        <svg class="svg-inline--fa fa-minus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg><!-- <i class="fa-solid fa-minus"></i> Font Awesome fontawesome.com -->
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="day-box__content active">
                                                <div class="day-box__content--container d-flex" style="gap: 10px;">
                                                    <div class="question-answer d-flex justify-content-between align-self-center">
                                                        <div class="question-answer__container">
                                                            <div class="answer">
                                        
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer0" value="1" checked="">
                                                        <label for="answerInput0-1">A</label>
                                                        <input type="text" name="answer1-A" value="A. She’s eating in a picnic area">
                                                    </div>
                                            
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer0" value="2">
                                                        <label for="answerInput0-2">B</label>
                                                        <input type="text" name="answer1-B" value="B. She’s waiting in line at a food truck">
                                                    </div>
                                            
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer0" value="3">
                                                        <label for="answerInput0-3">C</label>
                                                        <input type="text" name="answer1-C" value="C. She’s wiping off a bench.">
                                                    </div>
                                            
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer0" value="4">
                                                        <label for="answerInput0-4">D</label>
                                                        <input type="text" name="answer1-D" value="D. She’s throwing away a plate.">
                                                    </div>
                                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="search">  
                                    <div class="searchHeader d-flex">
                                        <div class="group-btn ">
                                            <button class="btn btn-save" id="AddQuestionGroup">Add</button>
                                        </div>
                                    </div>
                                    <div class="searchBody day-box">
                                        <div class="condition d-flex ">
                                            <div class="d-flex align-items-center">
                                                <h1 id="qgNowSeach">Câu 1</h1>
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
                </div>
            </div>
        </div>
    `;
}


async function patchFromData(url, token, formData) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("PATCH", url, true);
        
        if (token) {
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
        xhr.send(formData); 
    });
}


async function renPageGrammar()
{   
    mainElement.innerHTML=renHtmlForGrammarPageFirst();
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/grammas/'+idLesson);
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        document.getElementById("topicInput").value = response.data.data.nameLesson;
        document.getElementById("preview-container").innerHTML = `
            <div class="docx-preview">
                    ${response.data.data.content}
            </div>
        `;
    }
    renEventListenerForQuestionPage();
}
async function updateLesson() {
    if(document.getElementById('theory').classList.contains("nondisplay"))
    {
        addQuestionGroupForLesson();
    }else{

        let formData = new FormData();
        let fileInput = document.getElementById("uploadFile");
        if (fileInput.files.length > 0)formData.append("file", fileInput.files[0]); 
        formData.append("grammar", JSON.stringify({nameLesson: document.getElementById("topicInput").value}));
        console.log(formData);
        let response = await patchFromData("http://127.0.0.1:8080/api/v1/roadmaps/grammars/"+idLesson,localStorage.getItem("access_token"),formData)
        alert("edit done");
    }
}


function renEventListenerForQuestionPage()
{
    //Move Tab
    let buttonNavTabList = document.querySelectorAll('button[data-index^="navbar-"]');
    buttonNavTabList.forEach(buttonNavTab=>{
        buttonNavTab.addEventListener("click",async(e)=>{
            document.querySelector('button[data-index^="navbar-"].active').classList.remove("active")
            e.currentTarget.classList.add('active');
            let dataIndex = e.currentTarget.getAttribute('data-index');
            let suffix = dataIndex.split('-')[1];
            if(suffix=="exercise")
            {
                let responseExcercise = await getAjax(`http://127.0.0.1:8080/api/v1/roadmaps/grammas/${idLesson}/excercise`);
                console.log("render responseExcercise: ",responseExcercise);
                if (responseExcercise.status >= 200 && responseExcercise.status < 300) {
                    let htmlQs= responseExcercise.data.data.map((questionGroup,idxQuestionGroup)=>{
                        questionGroupCount++;
                        let htmlAns = questionGroup.answerList;
                        return `
                           <div class="day-box" data-index="QuestionGroup-${questionGroupCount}" onclick="clickSelectedQuestionNow(this)">
                                <div class="day-box__header d-flex justify-content-between align-items-center">
                                    <p>Question ${questionGroupCount}</p>
                                    <div class="group-btn">
                                        <button class="btn btn-clear">Clear</button>
                                        <button class="btn btn-collapse">
                                            <svg class="svg-inline--fa fa-minus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg><!-- <i class="fa-solid fa-minus"></i> Font Awesome fontawesome.com -->
                                        </button>
                                    </div>
                                </div>
                                <div class="day-box__content active">
                                    <div class="day-box__content--container d-flex" style="gap: 10px;">
                                        
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('');
                   document.getElementById("studyPlan").innerHTML=htmlQs;
                }
            }
            document.querySelector('div[data-nav^="navbar-"]:not(.nondisplay)').classList.add("nondisplay");
            document.querySelector(`div[data-nav="navbar-${suffix}"]`).classList.remove("nondisplay");

        })
    })

    

    // AddQuestin Elemt to list show
    document.getElementById("AddQuestionGroup").addEventListener("click",()=>{
        questionGroupCount++;
        document.getElementById("studyPlan").insertAdjacentHTML("beforeend", 
            `
                <div class="day-box" data-index="QuestionGroup-${questionGroupCount}" onclick="clickSelectedQuestionNow(this)">
                    <div class="day-box__header d-flex justify-content-between align-items-center">
                        <p>Question ${questionGroupCount}</p>
                        <div class="group-btn">
                            <button class="btn btn-clear">Clear</button>
                            <button class="btn btn-collapse">
                                <svg class="svg-inline--fa fa-minus" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"></path></svg><!-- <i class="fa-solid fa-minus"></i> Font Awesome fontawesome.com -->
                            </button>
                        </div>
                    </div>
                    <div class="day-box__content active">
                        
                    </div>
                </div>
            `
        );
    })


    eventForBtnQGDetail();


    //Search Question Group
    document.getElementById('searchBtn').addEventListener("click",async ()=>{
        let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/search?value=${document.getElementById('searchQuestion').value}&size=10&type=type`,localStorage.getItem("access_token"));
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
            let qsClickedElement=document.querySelector(`div[data-index="QuestionGroup-${qsAddNow}"]`);
            console.log(qsAddNow,qsClickedElement);
            let htmlQsAddToShow = questionGroup.questionList.map((questionItem,idxQuestion)=>
            {
                let htmlAnsToShow =questionItem.answerList.map((ansItem,idxAnswer)=>
                {
                    return `
                        <div class="answer-group">
                            <input type="radio" name="correctAnswer0" value="1" ${ansItem.isCorrect?'checked':''}>
                            <label for="answerInput0-${idxAnswer+1}">${String.fromCharCode(idxAnswer+65)}</label>
                            <input type="text" name="answer${idxAnswer+1}-${String.fromCharCode(idxAnswer+65)}" value="${ansItem.answer}">
                        </div>
                    `;
                }).join('');
                return `
                    <div class="question-answer__container">
                        <div class="question">
                            <input type="text" name="questionInput2" placeholder="Question" value="${questionItem.question}">
                        </div>
                        <div class="answer">
                            ${htmlAnsToShow}
                        </div>
                    </div>
                `;
            }).join('');
            qsClickedElement.querySelector(".day-box__content").innerHTML=
            `
                    <div class="day-box__content--container d-flex" style="gap: 10px;">
                        <div class="question-answer d-flex justify-content-between align-self-center">
                           ${htmlQsAddToShow}
                        </div>
                    </div>
                `;
            listQuestionGroup = listQuestionGroup.filter(item => item !== mapQuestionGroup[qsAddNow]);
            mapQuestionGroup[qsAddNow]=parseInt(suffix);
            listQuestionGroup.push(parseInt(suffix))
            console.log(mapQuestionGroup);
            document.getElementById('searchBtn').click();
            console.log("listQuestionGroup: ",listQuestionGroup);
        })
    });
}
function clickSelectedQuestionNow(e)
{
    let dataIndex = e.getAttribute('data-index');
    let suffix = dataIndex.split('-')[1];
    document.getElementById("qgNowSeach").innerText="Câu "+suffix;
    qsAddNow= parseInt(suffix);
 
}

async function addQuestionGroupForLesson()
{
    let questionGroupListRequest=[];
    listQuestionGroup.forEach((item,index)=>{
        questionGroupListRequest.push(
            {
                idQuestionGroup: item,
                orderOfQuestionGroup: index+1
            }
        )
    })
    console.log("list question group id request for exam: ",questionGroupListRequest);
    let response = await postAjax(`http://127.0.0.1:8080/api/v1/roadmaps/${idLesson}/excercise`,JSON.stringify(questionGroupListRequest),localStorage.getItem("access_token"));
    console.log("render Question: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        window.location.href="/admin/lessons/"+idLesson;
    }
}
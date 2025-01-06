let check;
let mainElemnent = document.getElementById("main");
async function start() {
    check = await checkAccount('ROLE_ADMIN');
    if(check)renPageQuestionGroup();
}
start();
async function renPageQuestionGroup(){
    mainElemnent.innerHTML=renHtmlQuestionGroupForFirst();
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/search?value=${document.getElementById('searchQuestion').value}`,localStorage.getItem("access_token"));
    console.log("render Question: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let htmlQuestionGroups = response.data.data.map((questionGroup,indexQuestionGroup)=>{
        let htmlQuetion = questionGroup.questionList.map((question,indexQuestion)=>{
                return `<li>${question.explanation}</li>`
            }).join('');
            return `
                <div class="day-box" >
                    <div>
                        <h2>Câu ${indexQuestionGroup+1}</h2>
                        <div class="group-btn">
                            <button class="btn btn-save" onclick="goToQuestionGroupDetail(${questionGroup.id})">Edit</button></button>
                        </div>
                    </div>
                    <ul>
                       ${htmlQuetion}
                    </ul>
                </div>
            `;
        }).join('');
        document.getElementById('questionGroupList').innerHTML=htmlQuestionGroups;
    }
    renEventListenerForQuestionGroupPage();
}
function renHtmlQuestionGroupForFirst(){
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
                        <a href="/admin/roadmap">Quản lý lộ trình</a>
                    </div>
                </div>
                <div class="navbar__user">
                    <div class="avatar">
                    </div>
                </div>
            </div>
        </div>

        <div id="container">
            <div class="container__content">
                <div class="main-content">

                    <!-- List and Search -->
                    <!-- Condition -->
                    <div class="condition">
                        <div class="condition__filter">
                            <select name="filter" id="filter">
                                <option value="all">Tất cả</option>
                                <option value="part1">Part1</option>
                                <option value="part2">Part2</option>
                                <option value="part3">Part3</option>
                                <option value="part4">Part4</option>
                                <option value="part5">Part5</option>
                                <option value="part6">Part6</option>
                                <option value="part7">Part7</option>
                            </select>
                        </div>
                       
                        <div class="condition__search">
                            <input type="text" placeholder="Tìm kiếm" id="searchQuestion">
                            <button id="searchBtn"><i class="fas fa-search"></i></button>
                        </div>
                        <div class="group-btn">
                            <button class="btn btn-save" onclick="linkto('/admin/questiongroupsadd')">Add</button>
                        </div>
                    </div>

                    <div class="study-plan" id="questionGroupList">

                      
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function renEventListenerForQuestionGroupPage(){
    document.getElementById('searchBtn').addEventListener("click",async ()=>{
        let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/search?value=${document.getElementById('searchQuestion').value}${document.getElementById('filter').value=='all'?'':'&type='+document.getElementById('filter').value}`,localStorage.getItem("access_token"));
        console.log("render Question: ",response.data);
        if (response.status >= 200 && response.status < 300) {
            let htmlQuestionGroups = response.data.data.map((questionGroup,indexQuestionGroup)=>{
            let htmlQuetion = questionGroup.questionList.map((question,indexQuestion)=>{
                    return `<li>${question.explanation}</li>`
                }).join('');
                return `
                    <div class="day-box" >
                        <div>
                            <h2>Câu ${indexQuestionGroup+1}</h2>
                            <div class="group-btn">
                                <button class="btn btn-save" onclick="goToQuestionGroupDetail(${questionGroup.id})">Edit</button></button>
                            </div>
                        </div>
                        <ul>
                           ${htmlQuetion}
                        </ul>
                    </div>
                `;
            }).join('');
            document.getElementById('questionGroupList').innerHTML=htmlQuestionGroups;
        }
    })
}
function goToQuestionGroupDetail(idQuestionGroup){
    window.location.href="/admin/questiongroups/"+idQuestionGroup;
}
function linkto(link){
    window.location.href=link;
}
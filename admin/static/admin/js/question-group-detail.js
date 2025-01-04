let check;
let idQuestionGroup=window.location.href.match(/\/questiongroups\/(\d+)(\/|$)/)[1];
let mainElemnent = document.getElementById("main");
async function start() {
    check = await checkAccount('ROLE_ADMIN');
    if(check)renPageQuestionGroupDetail();
}
start();
async function renPageQuestionGroupDetail()
{
    mainElemnent.innerHTML = renHtmlQuestionGroupForFirst();
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/questiongroups/${idQuestionGroup}`,localStorage.getItem("access_token"));
    console.log("render Question: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        let questionGroupData= response.data.data;
        let htmlResource = ``; 
        document.getElementById('questionGroup').innerHTML=`
            <div class="containner__title align-items-center" style="gap: 10px;">
                <h2 class="part__title">Part 1</h2>
            </div>
            <div class="study-plan">
                <div class="day-box">
                    <div class="day-box__header d-flex justify-content-between align-items-center">
                        <p>Question 1</p>
                        <div class="group-btn">
                            <button class="btn btn-clear">Clear</button>
                            <button class="btn btn-save">Save</button>
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
                                    <div class="question">
                                        <input type="text" name="questionInput1" placeholder="Question" value="${questionGroupData.questionList[0].explanation}">
                                    </div>
                                    <div class="answer">
                                        <div class="answer-group">
                                            <input type="radio" name="correctAnswer1">
                                            <label for="answerInput1-1">A</label>
                                            <input type="text" name="answer1-A">
                                        </div>
                                        <div class="answer-group">
                                            <input type="radio" name="correctAnswer1">
                                            <label for="answerInput1-2">B</label>
                                            <input type="text" name="answer1-B">
                                        </div>
                                        <div class="answer-group">
                                            <input type="radio" name="correctAnswer1">
                                            <label for="answerInput1-3">C</label>
                                            <input type="text" name="answer1-C">
                                        </div>
                                        <div class="answer-group">
                                            <input type="radio" name="correctAnswer1">
                                            <label for="answerInput1-4">D</label>
                                            <input type="text" name="answer1-D">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="resource d-flex" style="gap: 10px;">
                                <div class="resource__item" style="flex: 50%;">
                                    <div class="resource__item--upload-img" style="background-image: url(&quot;https://api.scandict.com/uploads/images/74_1_65c0a3d443c75.png&quot;); background-size: cover;">
                                        
                                    </div>
                                    <input type="file" name="upload-img" accept="image/*" class="no-active">
                                </div>
                                <div class="resource__item" style="flex: 50%;">
                                    <div class="resource__item--upload-audio">
                                        Upload Audio
                                    </div>
                                    <input type="file" name="upload-audio" accept="audio/*" class="no-active">
                                    <audio controls="" src="https://api.scandict.com/uploads/audios/74_1_65c0a3d72febd.mp3" style="width: 100%; margin-top: 10px; border-radius: 12px;"></audio>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}
function renHtmlQuestionGroupForFirst()
{
    return `
        <div id="header">
            <div id="navbar">
                <div class="divleft"></div>
                <div class="navbar__menu">
                    <div class="menu-item active">
                        <a href="/admin/dashboard">Thống kê</a>
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
                    <div class="tab-panel" role="tabpanel" id="questionGroup" aria-labelledby="tab-1" aria-hidden="false">
                        
                    </div>
                </div>
            </div>
        </div>
    `;
}
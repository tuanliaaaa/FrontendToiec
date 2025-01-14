let check;
let mainElemnent = document.getElementById("main");
async function start() {
    check = await checkAccount('ROLE_ADMIN');
    if(check)renPageQuestionGroupAdd();
}
start();
function renPageQuestionGroupAdd()
{
    mainElemnent.innerHTML = renHtmlQuestionGroupAddForFirst();
    renEventListernerPageQuestionGroupAdd();
}
function renHtmlQuestionGroupAddForFirst()
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
            <div class="container__content">
                <div class="main-content">
                    <div class="tabs">
                        <div class="tabs-nav" role="tablist" aria-label="Content sections">
                            <div class="tabs-indicator"></div>
                            <button class="tab-button" role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
                                Part 1
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">
                                Part 2
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-3" id="tab-3">
                                Part 3
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-4" id="tab-4">
                                Part 4
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-5" id="tab-5">
                                Part 5
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-6" id="tab-6">
                                Part 6
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-7" id="tab-7">
                                Part 7
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-8" id="tab-8">
                                Type 1
                            </button>
                            <button class="tab-button" role="tab" aria-selected="false" aria-controls="panel-9" id="tab-9">
                                Type 2
                            </button>
                        </div>
                
                        <div class="tab-panel" role="tabpanel" id="panel-1" aria-labelledby="tab-1" aria-hidden="false">
                            <!-- Content of Part 1 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 1</h2>

                            </div>
                            <div class="study-plan">
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part1')">Save</button>
                                            <button class="btn btn-collapse" >
                                                <!-- button save -->
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 30%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part1-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part1-question1-1">
                                                            <label for="answerInput1-1">A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part1-question1-1" >
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part1-question1-2">
                                                            <label for="answerInput1-2">B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part1-question1-2" >
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part1-question1-3">
                                                            <label for="answerInput1-3">C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part1-question1-3" >
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part1-question1-4">
                                                            <label for="answerInput1-4">D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-part1-question1-4" >
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px; flex: 70%;">
                                                <div class="resource__item" style="flex: 50%;">
                                                    <div class="resource__item--upload-img">
                                                        Upload Image
                                                    </div>
                                                    <input type="file" data-index="resource-part1" name="upload-img" accept="image/*" class="no-active">
                                                </div>
                                                <div class="resource__item" style="flex: 50%;">
                                                    <div class="resource__item--upload-audio">
                                                        Upload Audio
                                                    </div>
                                                    <input type="file" data-index="resource-part1" name="upload-audio" accept="audio/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                            </div>

                        </div>
                
                        <div class="tab-panel" role="tabpanel" id="panel-2" aria-labelledby="tab-2" aria-hidden="true">
                        
                            <!-- Content of Part 2 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 2</h2>

                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part2')">Save</button>
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
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part2-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part2-question1-1">
                                                            <label for="answerInput1-1">A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part2-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part2-question1-2">
                                                            <label for="answerInput1-2">B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part2-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part2-question1-3">
                                                            <label for="answerInput1-3">C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part2-question1-3">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;">
                                                <div class="resource__item" style="flex: 50%;">
                                                    <div class="resource__item--upload-audio">
                                                        Upload Audio
                                                    </div>
                                                    <input type="file" name="upload-audio" data-index="resource-part2" accept="audio/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                
                        <div class="tab-panel" role="tabpanel" id="panel-3" aria-labelledby="tab-3" aria-hidden="true">
                        
                            <!-- Content of Part 3 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 3</h2>

                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part3')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part3-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part3-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part3-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part3-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part3-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part3-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part3-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part3-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-part3-question1-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-part3-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part3-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-part3-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part3-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-part3-question2-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part3-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-part3-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part3-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-part3-question2-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput3" placeholder="Question" data-index="question-part3-3">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part3-question3-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer3-A" data-index="answer-part3-question3-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part3-question3-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer3-B"  data-index="answer-part3-question3-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part3-question3-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer3-C"  data-index="answer-part3-question3-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part3-question3-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer3-D"  data-index="answer-part3-question3-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;flex-direction: column; flex: 50%;">
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-img">
                                                        Upload Image
                                                    </div>
                                                    <input type="file" name="upload-img" data-index="resource-part3" accept="image/*" class="no-active">
                                                </div>
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-audio">
                                                        Upload Audio
                                                    </div>
                                                    <input type="file" name="upload-audio" data-index="resource-part3" accept="audio/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div class="tab-panel" role="tabpanel" id="panel-4" aria-labelledby="tab-4" aria-hidden="true">
                        
                            <!-- Content of Part 4 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 4</h2>

                            </div>
                            <div class="study-plan">
                
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part4')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part4-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part4-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part4-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part4-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part4-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part4-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part4-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part4-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-part4-question1-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-part4-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part4-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-part4-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part4-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-part4-question2-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part4-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-part4-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part4-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-part4-question2-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput3" placeholder="Question" data-index="question-part4-3">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part4-question3-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer3-A" data-index="answer-part4-question3-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part4-question3-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer3-B"  data-index="answer-part4-question3-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part4-question3-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer3-C"  data-index="answer-part4-question3-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part4-question3-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer3-D"  data-index="answer-part4-question3-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;flex-direction: column; flex: 50%;">
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-img">
                                                        Upload Image
                                                    </div>
                                                    <input type="file" name="upload-img" data-index="resource-part4" accept="image/*" class="no-active">
                                                </div>
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-audio">
                                                        Upload Audio
                                                    </div>
                                                    <input type="file" name="upload-audio" data-index="resource-part4" accept="audio/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="tab-panel" role="tabpanel" id="panel-5" aria-labelledby="tab-5" aria-hidden="true">
                        
                            <!-- Content of Part 5 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 5</h2>

                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part5')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center">
                                                <div class="question">
                                                    <input type="text" id="questionInput1" placeholder="Question 1" data-index="question-part5-1">
                                                </div>
                                                <div class="answer">
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer1" id="correctAnswer1-1" data-index="isCorrectAnswer-part5-question1-1">
                                                        <label for="answerInput1-1">A</label>
                                                        <input type="text" id="answerInput1-1" data-index="answer-part5-question1-1">
                                                    </div>
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer1" id="correctAnswer1-2" data-index="isCorrectAnswer-part5-question1-2">
                                                        <label for="answerInput1-2">B</label>
                                                        <input type="text" id="answerInput1-2" data-index="answer-part5-question1-2">
                                                    </div>
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer1" id="correctAnswer1-3" data-index="isCorrectAnswer-part5-question1-3">
                                                        <label for="answerInput1-3">C</label>
                                                        <input type="text" id="answerInput1-3" data-index="answer-part5-question1-3">
                                                    </div>
                                                    <div class="answer-group">
                                                        <input type="radio" name="correctAnswer1" id="correctAnswer1-4" data-index="isCorrectAnswer-part5-question1-4">
                                                        <label for="answerInput1-4">D</label>
                                                        <input type="text" id="answerInput1-4" data-index="answer-part5-question1--4">
                                                    </div>
                                                </div>
                                            </div>
            
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div class="tab-panel" role="tabpanel" id="panel-6" aria-labelledby="tab-6" aria-hidden="true">
                        
                            <!-- Content of Part 6 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 6</h2>

                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part6')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                               <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part6-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part6-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part6-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part6-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part6-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part6-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part6-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part6-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-part6-question1-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-part6-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part6-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-part6-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part6-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-part6-question2-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part6-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-part6-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part6-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-part6-question2-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput3" placeholder="Question" data-index="question-part6-3">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part6-question3-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer3-A" data-index="answer-part6-question3-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part6-question3-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer3-B" data-index="answer-part6-question3-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part6-question3-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer3-C" data-index="answer-part6-question3-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part6-question3-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer3-D" data-index="answer-part6-question3-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput4" placeholder="Question" data-index="question-part6-4">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part6-question4-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer4-A" data-index="answer-part6-question4-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part6-question4-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer4-B" data-index="answer-part6-question4-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part6-question4-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer4-C" data-index="answer-part6-question4-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part6-question4-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer4-D" data-index="answer-part6-question4-4">
                                                        </div>
                                                    </div>
                                                </div>

            
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;flex-direction: column;flex: 50%;">
                                                <div class="resource__item">
                                                    <div class="resource__item--upload-img">
                                                        Upload Image
                                                    </div>
                                                    <input type="file" name="upload-img" data-index="resource-part6" accept="image/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div class="tab-panel add-qa" role="tabpanel" id="panel-7" aria-labelledby="tab-7" aria-hidden="true">
                        
                            <!-- Content of Part 7 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Part 7</h2>
                                <div class="question-quantity">
                                    <p>Question:
                                        <span>0/5</span>
                                    </p>
                                </div>
                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('part7')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-part7-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part7-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-part7-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part7-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-part7-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part7-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-part7-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-part7-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-part7-question1-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-part7-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part7-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-part7-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part7-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-part7-question2-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part7-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-part7-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-part7-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-part7-question2-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput3" placeholder="Question" data-index="question-part7-3">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part7-question3-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer3-A" data-index="answer-part7-question3-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part7-question3-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer3-B" data-index="answer-part7-question3-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part7-question3-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer3-C" data-index="answer-part7-question3-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer3" data-index="isCorrectAnswer-part7-question3-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer3-D" data-index="answer-part7-question3-4">
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput4" placeholder="Question" data-index="question-part7-4">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part7-question4-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer4-A" data-index="answer-part7-question4-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part7-question4-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer4-B" data-index="answer-part7-question4-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part7-question4-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer4-C" data-index="answer-part7-question4-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer4" data-index="isCorrectAnswer-part7-question4-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer4-D" data-index="answer-part7-question4-4">
                                                        </div>
                                                    </div>
                                                </div>

            
                                                <!-- Add Question and Answer Btn -->
                                                <button class="btn btn-add-qa">Add Question and Answer</button>
                                            </div>
                                            <div class="resource d-flex" style="gap: 10px;flex-direction: column;flex: 50%;">
                                               <div class="resource__item">
                                                    <div class="resource__item--upload-img">
                                                        Upload Image
                                                    </div>
                                                    <input type="file" name="upload-img" data-index="resource-part7" accept="image/*" class="no-active">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div class="tab-panel" role="tabpanel" id="panel-8" aria-labelledby="tab-8" aria-hidden="true">
                        
                            <!-- Content of TYpe 1 -->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Type 1</h2>
                                <div class="question-quantity">
                                    <p>Question:
                                        <span>0/5</span>
                                    </p>
                                </div>
                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('type1')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-type1-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-type1-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-type1-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-type1-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-type1-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-type1-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-type1-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer1" data-index="isCorrectAnswer-type1-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-type1-question1-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-type1-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-type1-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-type1-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-type1-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-type1-question2-2" >
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-type1-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-type1-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="radio" name="correctAnswer2" data-index="isCorrectAnswer-type1-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-type1-question2-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <!-- Add Question and Answer Btn -->
                                                <button class="btn btn-add-qa">Add Question and Answer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                        <div class="tab-panel" role="tabpanel" id="panel-9" aria-labelledby="tab-9" aria-hidden="true">
                        
                            <!-- Content of type 2-->
                            <div class="containner__title align-items-center" style="gap: 10px;">
                                <h2 class="part__title">Type 2</h2>
                                <div class="question-quantity">
                                    <p>Question:
                                        <span>0/5</span>
                                    </p>
                                </div>
                            </div>
                            <div class="study-plan">
            
                                <div class="day-box">
                                    <div class="day-box__header d-flex justify-content-between align-items-center">
                                        <p>Question 1</p>
                                        <div class="group-btn">
                                            <button class="btn btn-clear">Clear</button>
                                            <button class="btn btn-save" onclick="saveQuestionGroup('type2')">Save</button>
                                            <button class="btn btn-collapse">
                                                <i class="fa-solid fa-minus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="day-box__content active">
                                        <div class="day-box__content--container d-flex" style="gap: 10px;">
                                            <div class="question-answer d-flex justify-content-between align-self-center" style="flex: 50%;">
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput1" placeholder="Question" data-index="question-type2-1">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer1" data-index="isCorrectAnswer-type2-question1-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer1-A" data-index="answer-type2-question1-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer1" data-index="isCorrectAnswer-type2-question1-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer1-B" data-index="answer-type2-question1-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer1" data-index="isCorrectAnswer-type2-question1-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer1-C" data-index="answer-type2-question1-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer1" data-index="isCorrectAnswer-type2-question1-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer1-D" data-index="answer-type2-question1-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <div class="question-answer__container">
                                                    <div class="question">
                                                        <input type="text" name="questionInput2" placeholder="Question" data-index="question-type2-2">
                                                    </div>
                                                    <div class="answer">
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer2" data-index="isCorrectAnswer-type2-question2-1">
                                                            <label>A</label>
                                                            <input type="text" name="answer2-A" data-index="answer-type2-question2-1">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer2" data-index="isCorrectAnswer-type2-question2-2">
                                                            <label>B</label>
                                                            <input type="text" name="answer2-B" data-index="answer-type2-question2-2">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer2" data-index="isCorrectAnswer-type2-question2-3">
                                                            <label>C</label>
                                                            <input type="text" name="answer2-C" data-index="answer-type2-question2-3">
                                                        </div>
                                                        <div class="answer-group">
                                                            <input type="checkbox" name="correctAnswer2" data-index="isCorrectAnswer-type2-question2-4">
                                                            <label>D</label>
                                                            <input type="text" name="answer2-D" data-index="answer-type2-question2-4">
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <!-- Add Question and Answer Btn -->
                                                <button class="btn btn-add-qa">Add Question and Answer</button>
                                            </div>
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

function renEventListernerPageQuestionGroupAdd()
{

    // ---------------------------------------- event chuyển tab ----------------------------------------------
    const tabList = document.querySelector('.tabs-nav');
    const tabs = tabList.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');
    const indicator = document.querySelector('.tabs-indicator');
    const setIndicatorPosition = (tab) => {
        indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
        indicator.style.width = `${tab.offsetWidth}px`;
    };
    // Set initial indicator position
    setIndicatorPosition(tabs[0]);
    tabs.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            const targetTab = e.target;
            const targetPanel = document.querySelector(
                `#${targetTab.getAttribute('aria-controls')}`
            );

            // Update tabs
            tabs.forEach((tab) => {
                tab.setAttribute('aria-selected', false);
                tab.classList.remove('active');
            });
            targetTab.setAttribute('aria-selected', true);
            targetTab.classList.add('active');

            // Update panels
            panels.forEach((panel) => {
                panel.setAttribute('aria-hidden', true);
            });
            targetPanel.setAttribute('aria-hidden', false);

            // Move indicator
            setIndicatorPosition(targetTab);
        });
    });

   

    //------------------------------------ Event Add resource-------------------------------------------------
    document.querySelectorAll('.resource__item').forEach(item => {
        // upload image
        const uploadImg = item.querySelector('.resource__item--upload-img');
        if (uploadImg) {
            const inputImg = item.querySelector('input[name="upload-img"]');
            const uploadImgText = uploadImg;
    
            inputImg.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        const result = reader.result;
                        uploadImg.style.backgroundImage = `url(${result})`;
                        uploadImg.style.backgroundSize = 'cover';
                        uploadImgText.textContent = '';
                    }
                    reader.readAsDataURL(file);
                }
            });
    
            uploadImg.addEventListener('click', () => {
                inputImg.click();
            });
        };
    
    
        // upload audio
        const uploadAudio = item.querySelector('.resource__item--upload-audio');
        if (uploadAudio) {
            const inputAudio = item.querySelector('input[name="upload-audio"]');
    
            uploadAudio.addEventListener('click', () => {
                inputAudio.click();
            });
    
            inputAudio.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function () {
                        const result = reader.result;
                        const audio = document.createElement('audio');
                        audio.setAttribute('controls', '');
                        audio.setAttribute('src', result);
    
                        // style audio
                        audio.style.width = '100%';
                        audio.style.marginTop = '10px';
                        audio.style.borderRadius = '12px';
    
                        // Remove old audio if exists
                        const existingAudio = item.querySelector('audio');
                        if (existingAudio) {
                            existingAudio.remove();
                        }
    
                        // append audio to uploadAudio
                        item.appendChild(audio);
                    }
                    reader.readAsDataURL(file);
                }
            });
        };
    
        // upload docs and preview
        const uploadDoc = item.querySelector('.resource__item--upload-doc');
        if (uploadDoc) {
            const inputDoc = item.querySelector('input[name="upload-doc"]');
            const previewContainer = item.querySelector('.preview-container') || document.createElement('div');
            previewContainer.classList.add('preview-container');
            item.appendChild(previewContainer);
    
            inputDoc.addEventListener('change', function () {
                const files = this.files;
                if (files.length > 0) {
                    // Clear existing preview content
                    previewContainer.innerHTML = '';
    
                    Array.from(files).forEach(file => {
                        const docxPreview = document.createElement('div');
                        docxPreview.classList.add('docx-preview');
                        previewContainer.appendChild(docxPreview);
    
                        const options = { inWrapper: false, ignoreWidth: true, ignoreHeight: true };
                        docx.renderAsync(file, docxPreview, null, options)
                            .then(() => {
    
                                // Apply inline styles to .docx element inside .docx-preview
                                const docxElement = docxPreview.querySelector('.docx');
                                if (docxElement) {
                                    docxElement.style.padding = '10px';
                                    docxElement.style.border = '1px solid #ccc';
                                    docxElement.style.borderRadius = '12px';
                                    docxElement.style.marginTop = '8px';
                                }
                            })
                            .catch(err => {
                                console.error("Error rendering DOCX:", err);
                            });
    
                        // Replace "Upload doc" text with file name
                        uploadDoc.textContent = file.name;
                    });
                }
            });
    
            uploadDoc.addEventListener('click', () => {
                inputDoc.click();
            });
        }
    });


    //------------------------------------ Event Add --------------------------------------------------------
}



async function saveQuestionGroup(type)
{
    let questioListElement = document.querySelectorAll(`input[data-index^="question-${type}-"]`);
    let questionListRequest = []
    // Add Question list to QuestionGroup
    questioListElement.forEach((questionElement,indexquestionElement)=>{
        let answerListElement = document.querySelectorAll(`input[data-index^="answer-${type}-question${indexquestionElement+1}-"]`);
        let answerListRequest =[]
        answerListElement.forEach((answerElement,indexAnswerElement)=>{
            let isCorrectAnswerListElement = document.querySelector(`input[data-index^="isCorrectAnswer-${type}-question${indexquestionElement+1}-${indexAnswerElement+1}"]`);
            answerListRequest.push(
                {
                    value: answerElement.value,
                    isCorrect: isCorrectAnswerListElement.checked
                }
            );
        })
        questionListRequest.push({
            value:questionElement.value ,
            script: "",
            explanation: "",
            answerList: answerListRequest
        })
    })
    let questionGroupRequest ={
        headerQuestionGroup: "",
        type: type,
        explains: "",
        script: "",
        questionList:questionListRequest
    }
    console.log("questionListRequest: ",questionGroupRequest);
    const formData = new FormData();
    formData.append("questionGroup", JSON.stringify(questionGroupRequest));

    let resourceListElement = document.querySelectorAll(`input[data-index^="resource-${type}"]`);
    resourceListElement.forEach((resourceElement)=>{
        if (resourceElement.files[0]) formData.append("files", resourceElement.files[0]);
    })

    console.log(formData);
    const response = await postFormData("http://localhost:8080/api/v1/questiongroups/questionGroups", formData,localStorage.getItem("access_token"));
    if(response.status==201) alert("lưu thành công");
    console.log("response save: ",response.data);
}
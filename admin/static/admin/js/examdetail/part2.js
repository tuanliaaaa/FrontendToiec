let mainElement = document.getElementById("main");
let part="2",questionTotal=0;
const idExam = window.location.href.match(/\/exams\/(\d+)\//)[1];
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
                indexNowQuestionItems++;
            }
            while(indexquestionItems>indexNow)
            {
                questionItemsHtml+=`
                    <div class="day-box">
                        <div class="day-box__header d-flex justify-content-between align-items-center">
                            <p>Question ${indexNow+1}</p>
                            <div class="group-btn">
                                <button class="btn btn-clear">Clear</button>
                                <button class="btn btn-save">Save</button>
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
                                            <input type="text" name="questionInput2" placeholder="Question">
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
                                        <div class="resource__item--upload-audio">
                                            Upload Audio
                                        </div>
                                        <input type="file" name="upload-audio" accept="audio/*" class="no-active">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                indexNow++;
            }
            questionItemsHtml+=`
                    <div class="day-box">
                        <div class="day-box__header d-flex justify-content-between align-items-center">
                            <p>Question ${indexNow+1}</p>
                            <div class="group-btn">
                                <button class="btn btn-clear">Clear</button>
                                <button class="btn btn-save">Save</button>
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
                            <div class="resource__item--upload-audio">
                                Upload Audio
                            </div>
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
            <div class="day-box">
                <div class="day-box__header d-flex justify-content-between align-items-center">
                    <p>Question ${i+1}</p>
                    <div class="group-btn">
                        <button class="btn btn-clear">Clear</button>
                        <button class="btn btn-save">Save</button>
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
                                    <input type="text" name="questionInput2" placeholder="Question" >
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
                                <div class="resource__item--upload-audio">
                                    Upload Audio
                                </div>
                                <input type="file" name="upload-audio" accept="audio/*" class="no-active">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }

        document.getElementById('studyPlan').innerHTML += questionItemsHtml;
    }
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
                <div class="main-content">
                    <div class="containner__title align-items-center" style="gap: 10px;">
                        <h2 class="part1__title">Part 1</h2>
                        <div class="question-quantity">
                            <p>Question:
                                <span>0/25</span>
                            </p>
                        </div>
                    </div>
                    <div class="study-plan" id="studyPlan" >
                        
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
    // Add and Preview Audio
document.querySelectorAll('.resource__item').forEach(item => {
    console.log(item);
    // upload image
    const uploadImg = item.querySelector('.resource__item--upload-img');
    if (uploadImg) {
        const inputImg = item.querySelector('input[name="upload-img"]');
        const uploadImgText = uploadImg;

        inputImg.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const objectURL = URL.createObjectURL(file);
                uploadImg.style.backgroundImage = `url(${objectURL})`; // Sử dụng URL ảo thay vì kết quả đọc từ FileReader
                uploadImg.style.backgroundSize = 'cover';
                uploadImgText.textContent = '';
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
        console.log('uploadAudio', uploadAudio);

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
                            console.log("docx: finished");

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
}

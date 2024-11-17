document.addEventListener('DOMContentLoaded', async function () {
    attachEventListeners();
});

function attachEventListeners() {
    document.querySelectorAll('.upload-image').forEach(uploadImageButton => {
        uploadImageButton.addEventListener("click", function () {
            parents(this, '.question-add')[0].querySelector('.image-file').click();
        });
    });

    document.querySelectorAll('.upload-audio').forEach(uploadAudioButton => {
        uploadAudioButton.addEventListener("click", function () {
            parents(this, '.question-add')[0].querySelector('.radio-file').click();
        });
    });

    document.querySelectorAll('.add-question').forEach(addQuestionButton => {
        addQuestionButton.addEventListener("click", function () {
            const isActive = this.classList.contains('active');

            document.querySelectorAll('.add-question').forEach(ele => ele.classList.remove('active'));
            document.querySelectorAll('.question-add').forEach(ele => ele.style.display = 'none');
            document.querySelectorAll('.show-popup').forEach(ele => ele.style.display = 'block');
            document.querySelectorAll('.hide-popup').forEach(ele => ele.style.display = 'none');

            if (!isActive) {
                this.classList.add('active');
                const questionElement = parents(this, '.question')[0];
                questionElement.querySelector('.question-add').style.display = 'block';
                this.querySelector('.show-popup').style.display = 'none';
                this.querySelector('.hide-popup').style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.radio-file').forEach(uploadAudioInput => {
        uploadAudioInput.addEventListener("change", function () {
            let file = event.target.files[0],
                questionAdd = parents(this, '.question-add')[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    questionAdd.querySelector('.audio-preview').src = e.target.result;
                    questionAdd.querySelector('.audio-preview').style.display = "block";
                }
                reader.readAsDataURL(file);
            }
            validateAddQuestion(questionAdd);
        });
    });

    document.querySelectorAll('.image-file').forEach(uploadImageInput => {
        uploadImageInput.addEventListener("change", function () {
            let file = event.target.files[0],
                questionAdd = parents(this, '.question-add')[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    questionAdd.querySelector('.image-preview').src = e.target.result;
                    questionAdd.querySelector('.image-preview').style.display = "block";
                }
                reader.readAsDataURL(file);
            }
            validateAddQuestion(questionAdd);
        });
    });

    document.querySelectorAll('.question-add-action button').forEach(questionAction => {
        questionAction.addEventListener("click", function () {
            if (this.classList.contains('active')) {
                parents(this, '.question')[0].querySelector('label.check input').checked = true;
            }
        });
    });

    document.querySelectorAll('.part-item').forEach(partItemMenu => {
        partItemMenu.addEventListener("click", function () {
            if (!this.classList.contains('active')) {
                document.querySelectorAll('.part-item').forEach(ele => ele.classList.remove('active'))
                document.querySelectorAll('.content-right').forEach(ele => ele.classList.remove('active'))
                let examPart = document.querySelector('.exam-part-' + this.dataset.index);
                examPart.classList.add('active');
                this.classList.add('active');
                renderAddQuestions(this.dataset.qty, examPart, this.dataset.index);
            }
        });
    });
}

function validateAddQuestion(questionAdd) {
    // if (questionAdd.querySelector('.answer-1').value && questionAdd.querySelector('.answer-2').value
    //     && questionAdd.querySelector('.answer-3').value && questionAdd.querySelector('.answer-4').value
    //     && questionAdd.querySelector('.radio-file').value && questionAdd.querySelector('.image-file').value) {
    //     questionAdd.querySelector('.question-add-action button').classList.add('active');
    // }
    if (questionAdd.querySelector('.answer-1').value && questionAdd.querySelector('.radio-file').value && questionAdd.querySelector('.image-file').value) {
        questionAdd.querySelector('.question-add-action button').classList.add('active');
    }
}

function renderAddQuestions(lengthQuestion, eleParent, type) {
    let addQuestionHtml = '',
        questionAnswer = '',
        uploadInput = '',
        uploadButton = '';
    switch (type) {
        case '1':
            questionAnswer = `
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `                                
            <div class="upload-image">
                <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                              stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </g>
                </svg>
            </div>
            <div class="upload-audio">
                <svg width="64px" height="64px" viewBox="-3.6 -3.6 31.20 31.20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z"
                              stroke="#1C274C" stroke-width="1.5"></path>
                        <circle cx="8" cy="14" r="3" stroke="#1C274C" stroke-width="1.5"></circle>
                        <path d="M13.5 11H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 14H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 17H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M6.5 6L15 2" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                    </g>
                </svg>
            </div>`;
            uploadInput = `
            <input type="file" class="radio-file" name="radioFile" accept=".mp3, .wav, .ogg" required
                   style="display: none">
            <input type="file" class="image-file" name="imageFile" accept=".jpg, .jpeg, .png, .gif" required
                   style="display: none">`;
            break;
        case '2':
            questionAnswer = `
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
            </label>`;
            uploadButton = `                                
            <div class="upload-audio">
                <svg width="64px" height="64px" viewBox="-3.6 -3.6 31.20 31.20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z"
                              stroke="#1C274C" stroke-width="1.5"></path>
                        <circle cx="8" cy="14" r="3" stroke="#1C274C" stroke-width="1.5"></circle>
                        <path d="M13.5 11H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 14H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 17H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M6.5 6L15 2" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                    </g>
                </svg>
            </div>`;
            uploadInput = `
            <input type="file" class="radio-file" name="radioFile" accept=".mp3, .wav, .ogg" required
                   style="display: none">`;
            break;
        case '3':
            questionAnswer = `                            
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `                                
            <div class="upload-image">
                <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                              stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </g>
                </svg>
            </div>
            <div class="upload-audio">
                <svg width="64px" height="64px" viewBox="-3.6 -3.6 31.20 31.20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z"
                              stroke="#1C274C" stroke-width="1.5"></path>
                        <circle cx="8" cy="14" r="3" stroke="#1C274C" stroke-width="1.5"></circle>
                        <path d="M13.5 11H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 14H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 17H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M6.5 6L15 2" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                    </g>
                </svg>
            </div>`;
            uploadInput = `
            <input type="file" class="radio-file" name="radioFile" accept=".mp3, .wav, .ogg" required
                   style="display: none">
            <input type="file" class="image-file" name="imageFile" accept=".jpg, .jpeg, .png, .gif" required
                   style="display: none">`;
            break;
        case '4':
            questionAnswer = `                            
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `                                
            <div class="upload-image">
                <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                              stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                              stroke-linejoin="round"></path>
                    </g>
                </svg>
            </div>
            <div class="upload-audio">
                <svg width="64px" height="64px" viewBox="-3.6 -3.6 31.20 31.20" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z"
                              stroke="#1C274C" stroke-width="1.5"></path>
                        <circle cx="8" cy="14" r="3" stroke="#1C274C" stroke-width="1.5"></circle>
                        <path d="M13.5 11H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 14H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M13.5 17H19" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                        <path d="M6.5 6L15 2" stroke="#1C274C" stroke-width="1.5"
                              stroke-linecap="round"></path>
                    </g>
                </svg>
            </div>`;
            uploadInput = `
            <input type="file" class="radio-file" name="radioFile" accept=".mp3, .wav, .ogg" required
                   style="display: none">
            <input type="file" class="image-file" name="imageFile" accept=".jpg, .jpeg, .png, .gif" required
                   style="display: none">`;
            break;
        case '5':
            questionAnswer = `
            <label class="question-answer">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `<input type="text">`;
            break;
        case '6':
            questionAnswer = `
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `<input type="text">`;
            break;
        case '7':
            questionAnswer = `
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>
            <label class="question-answer">
                <input type="text">
                <input type="text" class="answer-1">
                <input type="text" class="answer-2">
                <input type="text" class="answer-3">
                <input type="text" class="answer-4">
            </label>`;
            uploadButton = `<input type="text">            
                <div class="upload-image">
                    <svg width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
                                  stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                  stroke-linejoin="round"></path>
                        </g>
                    </svg>
                </div>`;
            uploadInput = `
            <input type="file" class="image-file" name="imageFile" accept=".jpg, .jpeg, .png, .gif" required
                   style="display: none">`;
            break;
    }
    for (let i = 0; i < lengthQuestion; i++) {
        addQuestionHtml += `
            <div class="question">
                <div class="question-content">
                    <div class="label">Nhóm câu ${i + 1}</div>
                    <label class="check">
                        <input type="checkbox">
                    </label>
                    <div class="add-question">
                        <svg class="show-popup" fill="#000000" width="64px" height="64px" viewBox="-4.8 -4.8 41.60 41.60" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM23 15h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                            </g>
                        </svg>
                        <svg class="hide-popup" width="64px" height="64px" viewBox="-3.6 -3.6 31.20 31.20" fill="none"
                             xmlns="http://www.w3.org/2000/svg" style="display: none">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <circle cx="12" cy="12" r="10" stroke="#1C274C" stroke-width="1.5"></circle>
                                <path d="M15 12H9" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="question-add" style="display: none">
                    <form method="POST" enctype="multipart/form-data">
                        <div class="question-add-content">
                            ` + questionAnswer + `
                            <div class="question-media-preview">
                                <img class="image-preview" src="" alt="Image Preview" style="height: 100px;display: none"/>
                                <audio class="audio-preview" controls style="display:none;"></audio>
                            </div>
                            <div class="question-att">
                                ` + uploadButton + `
                            </div>
                            ` + uploadInput + `
                        </div>
                        <div class="question-add-action">
                            <button type="button">Gửi</button>
                        </div>
                    </form>
                </div>
            </div>`;
    }
    eleParent.querySelector('.list-question').innerHTML = addQuestionHtml;
    attachEventListeners();
}

function parents(element, selector) {
    const results = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (currentElement.matches(selector)) {
            results.push(currentElement);
        }
        currentElement = currentElement.parentElement;
    }

    return results;
}
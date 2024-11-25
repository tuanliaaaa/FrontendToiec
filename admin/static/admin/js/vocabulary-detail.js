let listItemElement = document.getElementById("list-item");
let topicId= window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
let wordList={};
document.getElementById("addItemButton").addEventListener("click",(e)=>{
    listItemElement.innerHTML+=
        `
            <div class="item">
                    <div class="item__header">
                        <div class="wordItem">
                            <div class="item___headerTopic">
                                <svg class="checked nondisplay" fill="#000000" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 288.941 288.941" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path id="Check" d="M285.377,46.368c-4.74-4.704-12.439-4.704-17.179,0L96.309,217.114L20.734,142.61 c-4.74-4.704-12.439-4.704-17.179,0s-4.74,12.319,0,17.011l84.2,82.997c4.692,4.644,12.499,4.644,17.191,0l180.43-179.239 C290.129,58.687,290.129,51.06,285.377,46.368C280.637,41.664,290.129,51.06,285.377,46.368z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                                <svg class="rot nondisplay" version="1.1" id="Uploaded to svgrepo.com"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="64px" height="64px" viewBox="0 0 32 32"
                                    xml:space="preserve" fill="#000000"><g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"></g><g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"></g><g
                                        id="SVGRepo_iconCarrier"> <style
                                            type="text/css"> .linesandangles_een{fill:#111918;} .st0{fill:#111918;} </style>
                                        <path class="linesandangles_een"
                                            d="M24.308,10.229V9H26V4H6v5h2v1.229c0,2.665,1.79,5.037,4.352,5.769L12.36,16l-0.008,0.002 C9.79,16.734,8,19.107,8,21.771V23H6v5h20v-5h-1.692v-1.229c0-2.665-1.79-5.037-4.352-5.769L19.948,16l0.008-0.002 C22.518,15.266,24.308,12.893,24.308,10.229z M8,7V6h16v1H8z M24,25v1H8v-1H24z M17.716,17.442l1.69,0.483 c1.708,0.488,2.901,2.07,2.901,3.846V23H10v-1.229c0-1.776,1.193-3.358,2.901-3.846l1.691-0.483c0.65-0.186,1.087-0.766,1.087-1.442 s-0.437-1.256-1.088-1.442l-1.69-0.483C11.193,13.586,10,12.005,10,10.229V9h12.308v1.229c0,1.776-1.193,3.358-2.901,3.846 l-1.691,0.483c-0.651,0.186-1.088,0.766-1.088,1.442S17.064,17.257,17.716,17.442z"></path>
                                    </g></svg>
                                    <input type="text"  >
                                    <h3  class="nondisplay" >  </h3>
                            </div>
                            <div class="item__headerEdit">
                                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>
                            </div>
                        </div>
                        <div class="close__item">
                            <svg class="shrinkItem" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12H9M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                            <svg class="deleteItem" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </div>
                    </div>
                    <div class="item__body">
                        <div class="item__content">
                            <div class="item__text">
                                <div class="form-group">
                                    <label for="meaning">Nghĩa:</label>
                                    <input type="text" class="meaning"
                                        placeholder="Nhập nghĩa..." required > 
                                </div>
                                <div class="form-group">
                                    <label for="word-type">Từ Loại:</label>
                                    <input type="text" class="partOfSpeech"
                                        placeholder="Nhập nghĩa..." required >

                                </div>
                                <div class="form-group">
                                    <label for="phonetic">Phiên Âm:</label>
                                    <input type="text" class="phonetic"
                                        placeholder="Nhập phiên âm..." >
                                </div>
                                <div class="form-group">
                                    <label for="example">Ví Dụ:</label>
                                    <textarea class="example" rows="3"
                                        placeholder="Nhập ví dụ..." ></textarea>
                                </div>
                            </div>
                            <div class="item_resource">
                                <div class="form-group">
                                    <label for="image-file">Ảnh:</label>
                                    <input type="file" class="image-file"
                                        accept="image/*" class="img_bg">
                                    <div class="imgOfWord">
                                        <img src="" alt
                                            class="imgWord">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="audio-file">File Nghe:</label>
                                    <input type="file" class="audio-file"
                                        accept="audio/*">
                                    <audio class="audioPlayer" controls
                                        src=""></audio>
                                </div>
                            </div>
                        </div>
                        <div class="item__buttonSave">
                            <button class="saveWord">save</button>
                        </div>
                    </div>
                </div>
        `;
        addEventtForNewItem();
        window.scrollTo(0, document.documentElement.scrollHeight);
})
async function patchAjax(url, formData, token) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PATCH", url, true); // Đổi từ POST thành PATCH

        // Đặt header Authorization nếu có token
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) { // Sử dụng DONE thay vì số 4
                if (xhr.status >= 200 && xhr.status < 300) {
                        const responseData = JSON.parse(xhr.responseText);
                        resolve({
                            status: xhr.status,
                            data: responseData
                        });
                } else {
                    reject({
                        status: xhr.status,
                        error: xhr.statusText || "Request failed"
                    });
                }
            }
        };

        xhr.send(formData);
    });
}

async function postAjax(url, formData, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve({
                        status: this.status,
                        data: JSON.parse(this.responseText)
                    });
                } else {
                    reject({
                        status: this.status,
                        error: this.statusText
                    });
                }
            }
        };

        xhr.send(formData);
    });
}
async function  addWord(data,e) {
    let itemDetailElement = e.target.closest(".item");
    e.target.closest(".item").querySelector(".item___headerTopic svg.rot").classList.remove("nondisplay");
    let response = await postAjax("http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic/"+topicId+"/words",data, localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        wordList[response.data.idDetail] = response.data;
        e.target.closest(".item").querySelector(".item___headerTopic input").classList.add("nondisplay");
        let nameWordElement=e.target.closest(".item").querySelector(".item___headerTopic h3");
        e.target.closest(".item").querySelector(".item___headerTopic svg.rot").classList.add("nondisplay");
        e.target.closest(".item").querySelector(".item___headerTopic svg.checked").classList.remove("nondisplay");
        nameWordElement.classList.remove("nondisplay");
        nameWordElement.innerHTML=response.data.nameLesson;
        e.target.closest(".item").classList.add("item-"+response.data.idDetail);
        e.target.closest(".item").setAttribute("itemId",response.data.idDetail)
        e.target.closest(".item").querySelector(".saveWord").classList.add("nondisplay");
        itemDetailElement.querySelector(".item__headerEdit").setAttribute("status","0");

        itemDetailElement.querySelector(".item___headerTopic input").classList.add("nondisplay");
        itemDetailElement.querySelectorAll("input").forEach((evt2)=>{
            evt2.disabled = true;
        })
        itemDetailElement.querySelector("textarea").disabled = true;
    }    
}
async function getAjax(url, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status);
                }
            }
        };

        xhr.onerror = function () {
            reject("Request failed");
        };

        xhr.send();
    });
}
async function deleteAjax(url, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true); 
        
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token); 
        }

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) { 
                if (this.status >= 200 && this.status < 300) { 
                    resolve({
                        status: this.status
                    });
                } else { 
                    reject("Error: " + this.status + " - " + this.statusText);
                }
            }
        };

        xhr.send(); 
    });
}
async function renListWord(params) {
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic/' + topicId + '/newwords');
    console.log(response);
    if (response.status === 200) {
        let listItemHtml = response.data.words.map((item,index)=>{
            wordList[item.idDetail] = item;
            return `
                <div class="item item-${item.idDetail}" itemId="${item.idDetail}">
                    <div class="item__header">
                        <div class="wordItem">
                            <div class="item___headerTopic">
                                <svg class="checked" fill="#000000" height="64px" width="64px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 288.941 288.941" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path id="Check" d="M285.377,46.368c-4.74-4.704-12.439-4.704-17.179,0L96.309,217.114L20.734,142.61 c-4.74-4.704-12.439-4.704-17.179,0s-4.74,12.319,0,17.011l84.2,82.997c4.692,4.644,12.499,4.644,17.191,0l180.43-179.239 C290.129,58.687,290.129,51.06,285.377,46.368C280.637,41.664,290.129,51.06,285.377,46.368z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g> </g></svg>
                                <svg class="rot nondisplay" version="1.1" id="Uploaded to svgrepo.com"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    width="64px" height="64px" viewBox="0 0 32 32"
                                    xml:space="preserve" fill="#000000"><g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"></g><g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"></g><g
                                        id="SVGRepo_iconCarrier"> <style
                                            type="text/css"> .linesandangles_een{fill:#111918;} .st0{fill:#111918;} </style>
                                        <path class="linesandangles_een"
                                            d="M24.308,10.229V9H26V4H6v5h2v1.229c0,2.665,1.79,5.037,4.352,5.769L12.36,16l-0.008,0.002 C9.79,16.734,8,19.107,8,21.771V23H6v5h20v-5h-1.692v-1.229c0-2.665-1.79-5.037-4.352-5.769L19.948,16l0.008-0.002 C22.518,15.266,24.308,12.893,24.308,10.229z M8,7V6h16v1H8z M24,25v1H8v-1H24z M17.716,17.442l1.69,0.483 c1.708,0.488,2.901,2.07,2.901,3.846V23H10v-1.229c0-1.776,1.193-3.358,2.901-3.846l1.691-0.483c0.65-0.186,1.087-0.766,1.087-1.442 s-0.437-1.256-1.088-1.442l-1.69-0.483C11.193,13.586,10,12.005,10,10.229V9h12.308v1.229c0,1.776-1.193,3.358-2.901,3.846 l-1.691,0.483c-0.651,0.186-1.088,0.766-1.088,1.442S17.064,17.257,17.716,17.442z"></path>
                                    </g></svg>
                                    <input type="text" value="${item.nameLesson}" class="nondisplay"  disabled>
                                    <h3> ${item.nameLesson} </h3>
                            </div>
                            <div class="item__headerEdit" status="0" >
                                <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z" fill="#0F0F0F"></path> </g></svg>
                            </div>
                        </div>
                        <div class="close__item" >
                            <svg class="shrinkItem" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12H9M17 21H7C4.79086 21 3 19.2091 3 17V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round"></path> </g></svg>
                            <svg class="deleteItem" width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </div>
                    </div>
                    <div class="item__body nondisplay">
                        <div class="item__content">
                            <div class="item__text">
                                <div class="form-group">
                                    <label for="meaning">Nghĩa:</label>
                                    <input type="text" class="meaning" disabled
                                        placeholder="Nhập nghĩa..." required value="${item.content}"> 
                                </div>
                                <div class="form-group">
                                    <label for="word-type">Từ Loại:</label>
                                    <input type="text" class="partOfSpeech" disabled
                                        placeholder="Nhập nghĩa..." required value="${item.partOfSpeech}">

                                </div>
                                <div class="form-group">
                                    <label for="phonetic">Phiên Âm:</label>
                                    <input type="text" class="phonetic" disabled
                                        placeholder="Nhập phiên âm..." value="${item.transcription}">
                                </div>
                                <div class="form-group">
                                    <label for="example">Ví Dụ:</label>
                                    <textarea class="example" rows="3"
                                        placeholder="Nhập ví dụ..." value="${item.example}" disabled></textarea>
                                </div>
                            </div>
                            <div class="item_resource">
                                <div class="form-group">
                                    <label for="image-file">Ảnh:</label>
                                    <input type="file" class="image-file" disabled
                                        accept="image/*" class="img_bg">
                                    <div class="imgOfWord">
                                        <img src="${item.image}" alt
                                            class="imgWord">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="audio-file">File Nghe:</label>
                                    <input type="file" class="audio-file" disabled
                                        accept="audio/*">
                                    <audio class="audioPlayer" controls
                                        src="${item.audio}"></audio>
                                </div>
                            </div>
                        </div>
                        <div class="item__buttonSave">
                            <button class="nondisplay saveWord" >save</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        listItemElement.innerHTML=listItemHtml;
        addEventtForNewItem();
        
    }
}
function addEventtForNewItem(){
    let listEditItem = document.querySelectorAll(".item__headerEdit");
    listEditItem.forEach((e)=>{
        e.addEventListener("click",(evt1)=>{
            if(e.getAttribute("status")=="0")
            {
                e.setAttribute("status","1");
                e.classList.add("nondisplay");
                let itemElement = e.closest(".item");
                itemElement.querySelector(".saveWord").classList.remove("nondisplay");
                itemElement.querySelector(".item___headerTopic h3").classList.add("nondisplay");
                itemElement.querySelector(".item___headerTopic input").classList.remove("nondisplay");
                itemElement.querySelectorAll("input").forEach((evt2)=>{
                    evt2.removeAttribute('disabled');
                })
                itemElement.querySelector("textarea").removeAttribute('disabled');
            }
        })
    })

    let listDeleteItem=document.querySelectorAll(".deleteItem");
    listDeleteItem.forEach((e)=>{
        e.addEventListener("click",(evt)=>{
            let itemParentElement = evt.target.closest(".item");
            if(itemParentElement.hasAttribute("itemId"))
            {
                let dialogElement=document.getElementById("dialog");
                dialogElement.classList.add("active");
                let dialogHtml=`
                    <div class="dialog__conntent">
                        <div class="dialog__header">
                            <h3> Bạn có muốn xóa từ vựng này không?</h3>
                        </div>
                        <div class="dialog__body">
                            <p>Nếu bạn xóa từ vựng này lịch sử làm bài của user về từ vựng sẽ bị xóa</p>
                        </div>
                        <div class="dialog__button">
                        <span  class="btndialog delete" dataId="${itemParentElement.getAttribute("itemId")}" onclick="deleteWord(this)">Xóa</span>
                        <span  class="btndialog" onclick="closeDialog()">Đóng</span>
                        </div>
                    </div>
                `;
                dialogElement.innerHTML=dialogHtml;
            }else{
                evt.target.closest(".item").remove();
            }
        })
    });
    let wordItems= document.querySelectorAll(".shrinkItem");
    wordItems.forEach((e)=>{
        e.addEventListener("click",(evt)=>{
        let nextElement= evt.target.closest('.item').querySelector('.item__body');
        if(nextElement.classList.contains("nondisplay")){
                nextElement.classList.remove("nondisplay");
        }else{
                nextElement.classList.add("nondisplay");
        }
        })
    })
    let imageFileInputElement = document.querySelectorAll(".image-file");
    imageFileInputElement.forEach((inputElement)=>{
        inputElement.addEventListener("change", (event) => {
            if (event.target.files) {
                event.target.nextElementSibling.querySelector("img").src=URL.createObjectURL(event.target.files[0]);
            } 
        });
    })
    
    let audioFileInputElements = document.querySelectorAll(".audio-file"); 
    audioFileInputElements.forEach((inputElement) => {
        inputElement.addEventListener("change", (event) => {
            if (event.target.files && event.target.files[0]) {
                const audioElement = event.target.nextElementSibling; 
                audioElement.src = URL.createObjectURL(event.target.files[0]);
                audioElement.load(); 
            }
        });
    });

    let saveWordElement = document.querySelectorAll(".saveWord");
    saveWordElement.forEach((btnElement)=>{
        btnElement.addEventListener("click",(e)=>{
            e.preventDefault();
            let itemParentElement = e.target.closest(".item");
            if (!itemParentElement.hasAttribute("itemId")) {
                let data = new FormData();
                data.append("image",e.target.closest(".item__body").querySelector(".image-file").files[0]);
                data.append("audio",e.target.closest(".item__body").querySelector(".audio-file").files[0]);
                let nameLesson = e.target.closest(".item").querySelector(".item___headerTopic input").value;
                let content = e.target.closest(".item__body").querySelector(".meaning").value;
                let transcription = e.target.closest(".item__body").querySelector(".phonetic").value;
                let example = e.target.closest(".item__body").querySelector(".example").value;
                let partOfSpeech = e.target.closest(".item__body").querySelector(".partOfSpeech").value;
                data.append("newWord",JSON.stringify(
                    { 
                        nameLesson:nameLesson,
                        content:content,
                        transcription:transcription,
                        example:example,
                        partOfSpeech:partOfSpeech
                    }
                ));
                addWord(data,e);
            }else{
                let wordData = wordList[itemParentElement.getAttribute("itemId")];
                let data = new FormData();
                const imageFile = e.target.closest(".item__body").querySelector(".image-file").files[0];
                if (imageFile) {
                    data.append("image", imageFile);
                }
                const audioFile = e.target.closest(".item__body").querySelector(".audio-file").files[0];
                if (audioFile) {
                    data.append("audio", audioFile);
                }
                const updateWordData = {};
                let nameLesson = e.target.closest(".item").querySelector(".item___headerTopic input").value;
                let content = e.target.closest(".item__body").querySelector(".meaning").value;
                let transcription = e.target.closest(".item__body").querySelector(".phonetic").value;
                let example = e.target.closest(".item__body").querySelector(".example").value;
                let partOfSpeech = e.target.closest(".item__body").querySelector(".partOfSpeech").value;
                if (nameLesson && nameLesson !== wordData.nameLesson) {
                    updateWordData.nameLesson = nameLesson;
                }
                if (content && content !== wordData.content) {
                    updateWordData.content = content;
                }
                if (transcription && transcription !== wordData.transcription) {
                    updateWordData.transcription = transcription;
                }
                if (example && example !== wordData.example) {
                    updateWordData.example = example;
                }
                if (partOfSpeech && partOfSpeech !== wordData.partOfSpeech) {
                    updateWordData.partOfSpeech = partOfSpeech;
                }
                data.append("newWord",JSON.stringify(
                    updateWordData
                ));
                console.log("data update of word: ",updateWordData);
                updateWord(data,itemParentElement.getAttribute("itemId"),e);
            }
        })
    })
}
function closeDialog()
{
    document.getElementById("dialog").classList.remove("active");
}
async function deleteWord(e)
{
    const wordId = parseInt(e.getAttribute('dataId'),10);
    console.log(document.querySelector(".item-"+wordId));
    let response = await deleteAjax('http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/words/' + wordId);
    delete wordList[wordId];
    document.querySelector(".item-"+wordId).remove();
    closeDialog();
}

async function updateWord(data,idWord,e) {
    let itemDetailElement = e.target.closest(".item");
    let rotIconElement = itemDetailElement.querySelector(".item___headerTopic svg.rot");
    rotIconElement.classList.remove("nondisplay");
    let response = await patchAjax(" http://localhost:8080/api/v1/lessonbyskill/vocabulary/words/"+idWord,data, localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        wordList[idWord]=response.data;
        itemDetailElement.querySelector(".item___headerTopic input").classList.add("nondisplay");
        let nameWordElement=itemDetailElement.querySelector(".item___headerTopic h3");
        rotIconElement.classList.add("nondisplay");
        itemDetailElement.querySelector(".item___headerTopic svg.checked").classList.remove("nondisplay");
        nameWordElement.classList.remove("nondisplay");
        nameWordElement.innerHTML=response.data.nameLesson;
        itemDetailElement.querySelector(".saveWord").classList.add("nondisplay");
        itemDetailElement.querySelector(".item___headerTopic h3").classList.remove("nondisplay");
        itemDetailElement.querySelector(".item___headerTopic input").classList.add("nondisplay");
        itemDetailElement.querySelector(".item__headerEdit").classList.remove("nondisplay");
        itemDetailElement.querySelector(".item__headerEdit").setAttribute("status","0");

        itemDetailElement.querySelector(".item___headerTopic input").classList.add("nondisplay");
        itemDetailElement.querySelectorAll("input").forEach((evt2)=>{
            evt2.disabled = true;
        })
        itemDetailElement.querySelector("textarea").disabled = true;
    }  
}

renListWord();

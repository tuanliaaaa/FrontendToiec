let lsIdLearningpath=[];
getGrammars();
async function getAjax(url, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        if (token) {
            xhr.setRequestHeader("Accept", "application/json");
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

        xhr.send();
    });
}
async function postAjax(url, token, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Accept", "application/json");
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        xhr.setRequestHeader("Content-Type", "application/json");  
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

        xhr.send(JSON.stringify(data)); 
    });
}

async function getGrammars()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/grammars');
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        let topicItemsHtml = response.data.map((lesson, index) => {
            return lesson.idDetail?`
                <div class="day-box" onclick="goToLessonDetailPage(${lesson.idDetail})">
                    <div class="day-box__header d-flex justify-content-between align-items-center">
                        <p>${lesson.nameLesson}</p>
                        <div class="group-btn">
                            <button class="btn btn-clear" t-data="${lesson.idDetail}" onclick="clearItem(this)">Clear</button>
                            <button class="btn btn-collapse" onclick="collapseItem(this)">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `:'';
        }).join('');
        document.getElementById("learningPath").innerHTML = topicItemsHtml;
    }
}
  
async function searchLessson(nameLesson,size,page) {
    let response = await getAjax("http://127.0.0.1:8080/api/v1/roadmaps/lessons/search?nameLesson="+nameLesson+"&size="+size+"&page="+page,localStorage.getItem("access_token"));
    return response.data;
}  


let debounceTimer; 

async function showPopup(type) {
    if(type!=="focus")
    {
        clearTimeout(debounceTimer); 
        debounceTimer = setTimeout(async () => { 
            const input = document.getElementById('searchInput');
            let lsLesson = await searchLessson(input.value,10,0);
            let topicItemsHtml = lsLesson.map((lesson, index) => {
                return lesson.idDetail?`
                    <div class="day-box" onclick="${lesson.idDetail}" >
                        <div class="day-box__header d-flex justify-content-between align-items-center">
                            <p>${lesson.nameLesson}</p>
                            <div class="group-btn">
                                <button class="btn btn-clear" t-data="${lesson.idDetail}" onclick="clearItem(this)">Clear</button>
                                <button class="btn btn-collapse" onclick="collapseItem(this)">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `:'';
            }).join('');
            document.getElementById("learningPath").innerHTML = topicItemsHtml;
        }, 500);
    }else{
        const input = document.getElementById('searchInput');
        let lsLesson = await searchLessson(input.value,10,0);
        let topicItemsHtml = lsLesson.map((lesson, index) => {
            return lesson.idDetail?`
                <div class="day-box">
                    <div class="day-box__header d-flex justify-content-between align-items-center">
                        <p>${lesson.nameLesson}</p>
                        <div class="group-btn">
                            <button class="btn btn-clear" t-data="${lesson.idDetail}" onclick="clearItem(this)">Clear</button>
                            <button class="btn btn-collapse" onclick="collapseItem(this)">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `:'';
        }).join('');
        document.getElementById("learningPath").innerHTML = topicItemsHtml;
    }
    
}



function clearItem(button) {
    const dayBox = button.closest('.day-box'); 
    const itemId = parseInt(button.getAttribute("t-data")); 
    lsIdLearningpath = lsIdLearningpath.filter(id => id != itemId);
    dayBox.remove();
}

function collapseItem(button) {
    const dayBoxHeader = button.closest('.day-box__header'); 
    const dayBox = dayBoxHeader.closest('.day-box');
    
    if (dayBox) {
        dayBox.classList.toggle('collapsed');
    }
}
function focusSearch(){
    showPopup("focus");
}
function goToLessonAddPage(){
    window.location.href="/admin/lessons/add";
}
function goToLessonDetailPage(idDetail){
    window.location.href="/admin/lessons/"+idDetail;
}


let idLearningPath = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
let lsIdLearningpath=[];
getLearningPath(idLearningPath);
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

async function getLearningPath(idLearningPath)
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/'+idLearningPath);
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        document.getElementById("nameDay").innerHTML = response.data.name;
        let topicItemsHtml = response.data.grammars.map((lesson, index) => {
            if(lesson.idDetail)lsIdLearningpath.push(lesson.idDetail);
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
            const popup = document.getElementById('popup');
            if (input.value.trim() !== '') {
                let lsLesson = await searchLessson(input.value,10,0);
                popup.innerHTML= lsLesson.map((lesson)=>{
                    return !lsIdLearningpath.includes(lesson.idDetail)?`
                        <p onclick="addItemToDayBox(this)" t-data="${lesson.idDetail}">${lesson.nameLesson}</p>
                    `:'';
                }).join('');
                popup.style.display = 'block';
            } else {
                popup.style.display = 'none';
            }
        }, 500);
    }else{
        const input = document.getElementById('searchInput');
        const popup = document.getElementById('popup');
        if (input.value.trim() !== '') {
            let lsLesson = await searchLessson(input.value,10,0);
            popup.innerHTML= lsLesson.map((lesson)=>{
                return !lsIdLearningpath.includes(lesson.idDetail)?`
                    <p onclick="addItemToDayBox(this)" t-data="${lesson.idDetail}">${lesson.nameLesson}</p>
                `:'';
            }).join('');
            popup.style.display = 'block';
        } else {
            popup.style.display = 'none';
        }
    }
    
}

function addItemToDayBox(item) {
    lsIdLearningpath.push(parseInt(item.getAttribute("t-data")));
    console.log("list IdLearningpath: ", lsIdLearningpath);

    const studyPlan = document.getElementById('learningPath');
    const dayBox = document.createElement('div');
    dayBox.className = 'day-box';

    dayBox.innerHTML = `
        <div class="day-box__header d-flex justify-content-between align-items-center">
            <p>${item.textContent}</p>
            <div class="group-btn">
                <button class="btn btn-clear" t-data="${item.getAttribute("t-data")}" onclick="clearItem(this)">Clear</button>
                <button class="btn btn-collapse" onclick="collapseItem(this)">
                    <i class="fa-solid fa-minus"></i>
                </button>
            </div>
        </div>
    `;

    studyPlan.appendChild(dayBox);

    item.remove();
    const popup = document.getElementById('popup');
    if (popup.childElementCount === 0) {
        popup.style.display = 'none';
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

document.addEventListener('click', function(event) {
    const popup = document.getElementById('popup');
    const input = document.getElementById('searchInput');
    if (!popup.contains(event.target) && event.target !== input) {
        popup.style.display = 'none';
        clearTimeout(debounceTimer); 
    }
});


document.getElementById('popup').addEventListener('click', function(event) {
    event.stopPropagation(); 
});

async function updateLessonforDay(){
    let response =await postAjax(`http://127.0.0.1:8080/api/v1/roadmaps/days/${idLearningPath}/lesson`,localStorage.getItem("access_token"),lsIdLearningpath);
    alert("save done");
    getLearningPath(idLearningPath);
}

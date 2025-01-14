let topicWord;
let wordList;
let wordUseList = [];
let wordsScore = {};
let nowIndex = 0;
let countChecked = 0;
let lessonElement = document.getElementById('page__main');
let idLesson;
try{

     idLesson = window.location.href.match(/\/vocabulary\/(\d+)(\/|$)/)[1];
}catch{

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Hoán đổi vị trí i và j
    }
    return array;
}
function setTopicWord(topicWordInput) {
    topicWord = topicWordInput;
}

async function renderVocabularyTpl() {
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic');
    if (response.status === 200) {
        const template = document.getElementById('template-page-vocabulary').innerHTML;
        let vocabularyHtml = response.data.map((item) => {
            return `
                <li class="vocabulary__item-exam" data-id="${item.id}">
                    <a class="item-exam__section" href="/vocabulary/${item.id}">
                        <div class="item-exam__word-learn">
                            <p class="item-exam__name">${item.name}</p>
                        </div>
                        <p class="item-exam__learn"><span>Học ngay</span></p>
                    </a>
                </li>`;
        }).join('');

        // const finalHtml = template.replace('{{listVocabulary}}', vocabularyHtml);
        document.getElementById('main-content').innerHTML += template;
        document.getElementById('main-content').querySelector(".vocabulary__list-exam").innerHTML += vocabularyHtml;
    }
}

async function renderVocabularyDetailTpl() {
    let dataHistory = await getHistorieVocabularyOfUser();
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic/' + topicWord + '/newwords');
    if (response.status === 200) {
        document.getElementById("lessonName").innerHTML = response.data.name;
        wordList = response.data.words;
        console.log("wordList: ", wordList);
        let vocabularyDetailHtml = response.data.words.map((item, index) => {
            wordsScore[index] = 0;
            return `
                <li class="list-word__item">
                    <div class="item__percent">
                        <div class="item__single-chart">
                            <svg viewBox="0 0 36 36" class="circular-chart green">
                                <path class="circle-bg" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                <path class="circle" stroke-dasharray="${dataHistory[item.idDetail]?(dataHistory[item.idDetail]['score']/2)*100:0}, 100" d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                                <text x="18" y="21.35" class="percentage">${dataHistory[item.idDetail]?(dataHistory[item.idDetail]['score']/2)*100:0}%</text>
                            </svg>
                        </div>
                    </div>
                    <div class="item__word-info">
                        <p>${item.nameLesson}</p>
                        <p><i>(${item.partOfSpeech})</i> - ${item.content}</p>
                    </div>
                </li>`;
        }).join('');
        document.getElementById('list-vocabulary-detail').innerHTML = vocabularyDetailHtml;
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    if (document.querySelector('#main-content')) {
        await renderVocabularyTpl();
    } else {
        await renderVocabularyDetailTpl();
    }

});

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
async function postAjax(url, jsonData, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status);
                }
            }
        };
        xhr.send(jsonData);
    });
}


async function getHistorieVocabularyOfUser()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/vocabularies?size=1&page=0&idLesson='+idLesson,localStorage.getItem("access_token"));
    console.log("rensponse from Server Histories :",response.data);
    if (response.status === 200) {
        let data ={};
        if(response.data.length==0)return {};
        response.data[0]['historyDetails'].forEach(element => {
            data[element.idLessonDetail]=element;
        });
        console.log("histories: ",data);
        return data;
    } else{
        return {};
    }
}


//----------------- Liên quan đến làm bài tập-------------------//
async function optionLessonWord(wordIndex) {
    if (wordList[wordIndex]) {
        let htmloptionLessonWord = `
            <div class="page__work-listen">
                <div class="work-listen__game-show">
                    <p class="work-listen__label">Nhận biết từ mới</p>
                    <div class="work-listen__content">
                        <b class="work-listen__name">${wordList[wordIndex].nameLesson}</b>
                        <div class="work-listen__mean">
                            <i>${wordList[wordIndex].partOfSpeech}</i>
                            <span>${wordList[wordIndex].content}</span>
                        </div>
                    </div>
                    <div class="work-listen__list">
                        <div class="work-listen__item">
                            <div class="item__icon">
                                <img src="/static/home/img/icons/sound.png">
                            </div>
                            <p>${wordList[wordIndex].transcription}</p>
                        </div>
                    </div>
                    <div class="work-listen__img">
                        <img src="${wordList[wordIndex].image}">
                    </div>
                    <div class="work-listen__example">
                        <u><i>ví dụ</i></u>
                        <p>${wordList[wordIndex].example}</p>
                    </div>
                    <div class="work-listen___action">
                        <span class="btn btn--action" id="isOptionLessonWord">Học từ này</span>
                        <span class="btn btn--continue" id="isNotOptionLessonWord">Đã nhớ từ này</span>
                    </div>
                </div>
            </div>
        `;
        lessonElement.innerHTML = htmloptionLessonWord;
        document.getElementById("isOptionLessonWord").addEventListener("click", (e) => {
            wordUseList.push(wordIndex + "-1");
            wordUseList.push(wordIndex + "-2");
            if (countChecked < 4) countChecked++;
            if (countChecked != 4 && nowIndex!=wordList.length-1) {
                start(wordIndex + 1);
            }else{
                wordUseList = shuffleArray(wordUseList);
                countChecked = 0;
                start(wordUseList[0]);
            }
        });
        document.getElementById("isNotOptionLessonWord").addEventListener("click", (e) => {
            if(countChecked!=4)countChecked++;
            wordsScore[wordIndex]=2;
            if (countChecked == 4 && wordUseList.length != 0) {
                wordUseList = shuffleArray(wordUseList);
                countChecked = 0;
                start(wordUseList[0]);
            } else if (countChecked == 4 && nowIndex != wordList.length) {
                start(wordIndex + 1);
            } else if (countChecked != 4 && nowIndex != wordList.length ) {
                start(wordIndex + 1);
            } else if (countChecked != 4 && wordUseList.length != 0) {
                wordUseList = shuffleArray(wordUseList);
                countChecked = 0;
                start(wordUseList[0]);
            }
        });
    }
}

async function wordMatchingExercise(wordIndex) {
    if (wordList[wordIndex]) {
        htmlWordMatchingExercise = `
        <div class="page__work-listen">
            <div class="work-listen__game-show">
                <div class="title">Ghép cặp từ - Định nghĩa</div>
                <div class="grid">
                    <!-- Cột Left chứa từ vựng -->
                    <div class="left">
                        <div class="card">Persuasion</div>
                        <div class="card">Convince</div>
                        <div class="card">Satisfaction</div>
                        <div class="card">Fad</div>
                    </div>
                    <!-- Cột Right chứa định nghĩa -->
                    <div class="right">
                        <div class="card">mốt nhất thời, sự thích thú tạm thời; dở hơi, gàn dở</div>
                        <div class="card">Thuyết phục</div>
                        <div class="card">sự làm thỏa mãn, sự hài lòng</div>
                        <div class="card">sự thuyết phục, làm cho tin (chú ý: persuade > convince)</div>
                    </div>
                </div>
            </div>
        </div>
        `;
        lessonElement.innerHTML = htmlWordMatchingExercise;
    }
}

async function fillInTheBlankExercise(wordIndex) {
    if (wordList[wordIndex]) {
        let htmlfillInTheBlankExercise = `
        <div class="page__work-listen">
            <div class="work-listen__game-show">
                <div class="title">Nhập từ</div>
                <div class="definition">
                    <em${wordList[wordIndex].partOfSpeech}</em> ${wordList[wordIndex].content}
                </div>
                <div class="pronunciation">
                    <div class="audioDiv">
                        <button class="audio-button">
                            <img src="https://img.icons8.com/ios-filled/50/ffffff/speaker.png" alt="Play Audio" onclick="playAudioNext(this)">
                             <audio class="nondisplay" >
                                <source src="${wordList[wordIndex].audio}" type="audio/mpeg">
                            </audio>
                        </button>
                        <div>${wordList[wordIndex].transcription}</div>
                    </div>
                </div>
                <div class="input-container">
                    <img src="https://via.placeholder.com/40" alt="Hint icon">
                    <input type="text" class="input-box" placeholder="Nhập từ của bạn..." id="answerOfFillQuestion">
                </div>
            </div>
        </div>
        `;
        lessonElement.innerHTML = htmlfillInTheBlankExercise;
        wordUseList.shift();
        document.getElementById("answerOfFillQuestion").addEventListener("keydown", async (e) => {
            if (event.key === "Enter") {
                console.log("data in Blank: ",e.target.value.trim().toLowerCase());
                console.log("data ressult: ",wordList[wordIndex].nameLesson.trim().toLowerCase());
                if(e.target.value.trim().toLowerCase()==wordList[wordIndex].nameLesson.trim().toLowerCase()){
                    e.target.style.backgroundColor = "#2bc48a";
                    wordsScore[wordIndex]++;
                }else{
                    e.target.style.backgroundColor = "#e74c3c";
                }
                await sleep(1000);
                if (wordUseList.length != 0) start(wordUseList[0]);
                else if(nowIndex!=wordList.length)start(nowIndex + 1);
                else start(nowIndex);
            }
        })
    }
}

function trueOrFalseExercise(wordIndex) {
    if (wordList[wordIndex]) {
        let randomNumber = Math.floor(Math.random() * 4) + nowIndex-3;
        console.log("now: ",nowIndex,", random: ",randomNumber);
        let htmltrueOrFalseExercise = `
        <div class="page__work-listen">
            <div class="work-listen__game-show">
                <p class="title">Đúng hay Sai</p>
                <p class="definition"><em${wordList[randomNumber].partOfSpeech}</em> ${wordList[randomNumber].content}</p>
                <p class="word">${wordList[wordIndex].nameLesson}</p>
                <div class= "audioDiv">
                    <button class="audio-button">
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/speaker.png" alt="Play Audio">
                    </button>
                </div>
                <div class="buttons">
                <button class="button" id="correctTrueQuestion">Đúng</button>
                <button class="button" id="correctFalseQuestion">Sai</button>
                </div>
            </div>
        </div>
        `;
        lessonElement.innerHTML = htmltrueOrFalseExercise;
        wordUseList.shift();
        document.getElementById("correctTrueQuestion").addEventListener("click", async (e) => {
            if(randomNumber==wordIndex){
                e.target.classList.add("correct");
                wordsScore[wordIndex]++;
            }else{
                e.target.classList.add("incorrect");
            }
            await sleep(1500);
            if (wordUseList.length != 0) start(wordUseList[0]);
            else if(nowIndex!=wordList.length)start(nowIndex + 1);
            else start(nowIndex);
        });
        document.getElementById("correctFalseQuestion").addEventListener("click", async (e) => {
            if(randomNumber==wordIndex){
                e.target.classList.add("incorrect");
            }else{
                e.target.classList.add("correct");
                wordsScore[wordIndex]++;
            }
            await sleep(1500);
            if (wordUseList.length != 0) start(wordUseList[0]);
            else if(nowIndex!=wordList.length)start(nowIndex + 1);
            else start(nowIndex);
        });
    }
}

async function start(index) {
    console.log("index: ",index,"len: ",wordUseList.length);
    if (index == wordList.length&&wordUseList.length==0) {
        console.log("Score: ",wordsScore);
        const template = document.getElementById('template-exam-success').innerHTML,
        bodyEle = document.querySelector('body');
        bodyEle.classList.remove('page-result');
        bodyEle.classList.add('page-exam-success');
        bodyEle.innerHTML = template;

        
        let words=[];
        var sumTotal=0;
        for (let key in wordsScore) {
            sumTotal+=wordsScore[key];
            words.push({
                id:wordList[key].idDetail,
                score:wordsScore[key]
            })
        }
        console.log("history post: ",{
            topicId: topicWord,
            words:words
        });
        let response = await postAjax("http://127.0.0.1:8080/api/v1/histories/vocabularies", JSON.stringify({
            topicId: topicWord,
            words:words
        }), localStorage.getItem('access_token'));
        if (response.status >= 200 && response.status < 300) {
             
        }
        console.log(sumTotal);
        console.log(Object.keys(wordsScore).length*2);
        bodyEle.querySelector('.exam-success__notify').setAttribute('style', 'display:none');
        bodyEle.querySelector('#percent-result').textContent = (sumTotal/(Object.keys(wordsScore).length*2)).toFixed(2)*100+'%';
        bodyEle.querySelector('.percent__result').setAttribute('style', 'width:'+(sumTotal/(Object.keys(wordsScore).length*2))*100+'%');
       
        return;
    }
    if (isNaN(Number(index))) {
        let lastIndex = index.slice(index.lastIndexOf("-") + 1);
        if (lastIndex == '1') {
            trueOrFalseExercise(Number(index.slice(0, index.indexOf("-"))));

        } else if (lastIndex == '2') {
            fillInTheBlankExercise(Number(index.slice(0, index.indexOf("-"))));
        }
    } else {
        optionLessonWord(index);
        nowIndex = index;
    }
}
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function playAudioNext(e)
{
    console.log(e);
    if (e.closest('.audio-button')) {
        const button = e.closest('.audio-button');
        const audio = button.querySelector('audio');
        if (audio) {
            audio.play(); 
        } else {
            console.error("Không tìm thấy audio!");
        }
    }
}


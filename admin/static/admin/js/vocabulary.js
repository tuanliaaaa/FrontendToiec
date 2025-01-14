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

async function postAjax(url, jsonData, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        if(token){
            xhr.setRequestHeader("Content-Type", "application/json");
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
        xhr.send(jsonData);
    });
}
async function getAllTopic()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic');
    if (response.status >= 200 && response.status < 300) {
        
        let topicItemsHtml = response.data.map((topic, index) => {
            return `
                <div class="day-box">
                    <div class="d-flex spacebetween">
                        <h2>${topic.name}</h2>
                        <div class="group-btn">
                            <button class="btn btn-save" onclick="linkTo('/admin/vocabulary/word/${topic.id}')">Edit</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        document.getElementById("questionGroupList").innerHTML=topicItemsHtml;
    }
}
getAllTopic();
document.querySelector(".AddIcon").addEventListener("click",()=>{
    window.location.href="/admin/vocabulary/add";
})
function linkTo(url)
{
    window.location.href=url;
}
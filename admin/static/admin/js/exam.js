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
async function getAllExam()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/exams');
    if (response.status >= 200 && response.status < 300) {
        
        let topicItemsHtml = response.data.map((topic, index) => {
            return `
                <div class="day-box" >
                    <div class="d-flex spacebetween">
                        <h2>${topic.examName}</h2>
                        <div class="group-btn">
                            <button class="btn btn-save" onclick="linkTo('/admin/exams/${topic.idExam}/part1')">Edit</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        document.getElementById("questionGroupList").innerHTML=topicItemsHtml;
    }
}
getAllExam();
function linkTo(url)
{
    window.location.href=url;
}
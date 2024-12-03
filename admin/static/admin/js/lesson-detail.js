let idLesson = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);

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

async function getLesson(idLesson)
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/grammas/'+idLesson);
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        document.getElementById("topicInput").value = response.data.nameLesson;
        document.getElementById("preview-container").innerHTML = `
            <div class="docx-preview">
                    ${response.data.content}
            </div>
        `;
    }
}
getLesson(idLesson);
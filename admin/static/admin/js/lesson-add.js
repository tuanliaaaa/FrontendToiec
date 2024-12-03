async function postFromData(url, token, formData) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        
        if (token) {
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
        xhr.send(formData); 
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
async function createLesson() {
    let formData = new FormData();
    let fileInput = document.getElementById("uploadFile");
    if (fileInput.files.length > 0)formData.append("file", fileInput.files[0]); 
    formData.append("grammar", JSON.stringify({nameLesson: document.getElementById("topicInput").value}));
    console.log(formData);
    let response = await postFromData("http://127.0.0.1:8080/api/v1/roadmaps/grammars",localStorage.getItem("access_token"),formData)
    alert("save done");
}
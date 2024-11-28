async function saveTopic()
{
    let response = await postAjax("http://127.0.0.1:8080/api/v1/lessonbyskill/vocabulary/topic",JSON.stringify(
        {nameLesson: document.getElementById("topicName").value}
    ),localStorage.getItem("access_token"))
    if(response.status==201)
    {
        window.location.href="/admin/vocabulary/word/"+response.data.data.id;
    }
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
                    resolve({
                        status:this.status,
                        data:JSON.parse(this.responseText)
                    });
                } else {
                    reject("Error: " + this.status);
                }
            }
        };
        xhr.send(jsonData);
    });
}
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
async function getAllLearningPath()
{
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps');
    if (response.status >= 200 && response.status < 300) {
        console.log(response);
        let topicItemsHtml = response.data.map((topic, index) => {
            return `
                <div class="day-box" onclick="goToLearningPathDetail(${topic.id})">
                    <h2>${topic.name}</h2>
                    <ul>
                        ${topic.grammars.map(grammar =>
                            `
                                <li>${grammar.nameLesson}</li>
                            `).join('')
                        }
                    </ul>
                </div>
            `;
        }).join('');
        document.getElementById("learningPath").innerHTML = topicItemsHtml;
    }
}
getAllLearningPath();
function goToLearningPathDetail(id)
{
    window.location.href="/admin/learningpath/"+id;
}
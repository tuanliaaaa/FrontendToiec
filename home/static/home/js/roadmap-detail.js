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
renderRoadMap();
function start(id){
    window.location="/roadmapdetail/"+id;
}
async function renderRoadMap() {
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/52');
    console.log("render Roadmap",response);
    if (response.status >= 200 && response.status < 300) {
        let template = document.getElementById("template-grammar");
        console.log(template);
        let grammarsHtml = response.data.grammars.map((item,index)=>{
            return `
                <div class="lesson" onclick="start(${item.idDetail})">
                    <div class="info" >
                        <span class="label">Intro</span>
                        <span class="goal">Mục tiêu 100%</span>
                    </div>
                    <h3>${item.nameLesson}</h3>
                    <div class="status">
                        <span>100%</span>
                        <span class="checkmark">✔</span>
                    </div>
                </div>
                `;
        }).join('');
        document.getElementById("contaiiner__body").innerHTML=template.innerHTML;
        document.querySelector(".lessons").innerHTML=grammarsHtml;
       

    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
 
    }
}
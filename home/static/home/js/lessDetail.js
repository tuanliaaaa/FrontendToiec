let urlPath = window.location.pathname; // Lấy đường dẫn của URL
let idGrammar = urlPath.split('/').pop(); // Lấy phần cuối cùng sau dấu "/"

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

async function renderRoadMap() {
    
    let response = await getAjax('http://127.0.0.1:8080/api/v1/roadmaps/grammas/'+idGrammar);
    console.log("render Roadmap",response);
    if (response.status >= 200 && response.status < 300) {
       document.getElementById("introduction").innerHTML=response.data.content;
       

    }else if(response.status===401||response.status===403)
    {
        window.location='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
 
    }
}
if (!localStorage.getItem("access_token")) {
    window.location.href = "login.html";
} else {
    checkAccount();
}

function checkAccount() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:8080/api/v1/accounts/infor", true);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem("access_token"));
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 300) {
                console.log("Response:", JSON.parse(xhr.responseText));
            } else {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }
    };
    xhr.onerror = function () {
        alert("Không thể kết nối với server. Vui lòng thử lại sau.");
    };
    xhr.send();
}
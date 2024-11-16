let ipTxtNumberPhone = document.getElementById('numberPhone');
ipTxtNumberPhone.focus();
let ipTxtPassword = document.getElementById('password');
let btnLogin = document.getElementById('login');
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    if(ipTxtNumberPhone.value.trim()==="")
    {
        alert('Vui lòng nhập số điện thoai');
        ipTxtNumberPhone.focus();
        return;
    }
    if(ipTxtPassword.value.trim()==="")
    {
        alert('Vui lòng nhập mật khẩu');
        return;
    }
    let xhr = new XMLHttpRequest();

    xhr.open("POST", domain+"/api/v1/auths/login", true);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if (xhr.status === 201) {
            localStorage.setItem("access_token",JSON.parse(xhr.response).data['access_token']);
            localStorage.setItem("refresh_token",JSON.parse(xhr.response).data['refresh_token']);

            window.location="/home";

        } else {
            alert("Thông tin tài khoản không chính xác");
        }
    };

    var jsonData = JSON.stringify({
        username: ipTxtNumberPhone.value,
        password: ipTxtPassword.value
    });

    xhr.send(jsonData);
})
if (localStorage.getItem("access_token")) {
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
                window.location.href = "/home";
            } else {
                console.log("Response:", JSON.parse(xhr.responseText));
                localStorage.removeItem("access_token");
            }
        }
    };
    xhr.onerror = function () {
        alert("Không thể kết nối với server. Vui lòng thử lại sau.");
    };
    xhr.send();
}
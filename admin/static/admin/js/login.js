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

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            let response = JSON.parse(xhr.responseText);
            console.log('Response:', response);
            let checkAdmin=response.data.roles.some(element => {return element.roleName === "ROLE_ADMIN"});
            if(checkAdmin){
                window.location="/admin/vocabulary";
            }
        } else if(xhr.status >= 400 && xhr.status < 500) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        }
    };
    xhr.onerror = function () {
        alert("Không thể kết nối với server. Vui lòng thử lại sau.");
    };
    xhr.send();
}
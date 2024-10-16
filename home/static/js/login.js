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

    xhr.open("POST", "http://127.0.0.1:8080/api/v1/auths/login", true);
    
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        if (xhr.status === 201) {
            localStorage.setItem("token",JSON.parse(xhr.response).data['access_token']);
            window.location="/home";

        } else {
            console.error("Error:", xhr.statusText); 
        }
    };

    var jsonData = JSON.stringify({
        username: ipTxtNumberPhone.value,
        password: ipTxtPassword.value
    });

    xhr.send(jsonData);
})
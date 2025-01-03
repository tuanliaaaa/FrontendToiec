let ipTxtNumberPhone = document.getElementById('numberPhone');
ipTxtNumberPhone.focus();
let ipTxtConfirmPassword = document.getElementById('confirmPassword');
let ipTxtFullName = document.getElementById('fullName');
let ipTxtPassword = document.getElementById('password');
let btnLogin = document.getElementById('signup');
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    if(ipTxtNumberPhone.value.trim()==="")
    {
        alert('Vui lòng nhập số điện thoai');
        ipTxtNumberPhone.focus();
        return;
    }
    if(ipTxtFullName.value.trim()==="")
    {
        alert('Vui lòng nhập họ và tên');
        ipTxtFullName.focus();
        return;
    }
    if(ipTxtPassword.value.trim()==="")
    {
        alert('Vui lòng nhập mật khẩu');
        ipTxtPassword.focus();
        return;
    }
    if(ipTxtConfirmPassword.value!=ipTxtNumberPhone.value)
    {
        alert('Mật khẩu và mật khẩu nhập lại không giống nhau');
        ipTxtConfirmPassword.focus();
        return;
    }
 
    let xhr = new XMLHttpRequest();

    xhr.open("POST", domain+"/api/v1/auths/signup", true);
    
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
        fullname: ipTxtFullName.value,
        password: ipTxtPassword.value
    });

    xhr.send(jsonData);
})


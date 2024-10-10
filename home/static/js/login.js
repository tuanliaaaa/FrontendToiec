let ipTxtNumberPhone = document.getElementById('numberPhone');
ipTxtNumberPhone.focus();
let ipTxtPassword = document.getElementById('password');

let btnLogin = document.getElementById('login');
btnLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    if(ipTxtNumberPhone.value.trim()==="")
    {
        alert('cuts mej m di');
        ipTxtNumberPhone.focus();
        return;
    }
    if(ipTxtPassword.value.trim()==="")
    {
        alert('cuts mej m di');
        return;
    }
})
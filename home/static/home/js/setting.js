let mainElement = document.getElementById("main");
let checkAuth;
let popup;
start();
async function start(){
     checkAuth = await checkAccount();
    if(checkAuth) renPageSetting();
};

function renPageSetting()
{
    console.log("checkAuth : ",checkAuth.data.data);
    mainElement.innerHTML=renHtmlFirstForPageSetting();
    renEventListenerForPageSetting();
}
function renHtmlFirstForPageSetting()
{
    return `
        <div id="page">
            <div id="header">
                <div class="header__content">
                    <b class="fs-18">TOEIC® TUAN</b>
                </div>
            </div>
            <div id="container">
                <div id="settings">
                    <div class="userInfor flex align-center">
                        <div class="avatar">
                            <a href="/practice-listening" class="">
                            <img src="https://vi.toeicmax.com/icon/user.png"></a>
                        </div>
                        <div class="flex_1">
                            <p><b class="fs-15">${checkAuth.data.data.name} </b></p>
                            <p class="cl-999">${checkAuth.data.data.username}</p>
                        </div>
                        <div class="flex flex-display-end">
                            <span class="btn btn-sm btn-action">Đăng xuất</span>
                        </div>
                    </div>
                    <ul id="menu_setting">
                        <li class="flex align-center">
                            <img src="https://vi.toeicmax.com/icon/crown.png">
                            <div class="flex" id="inforAccount">Chỉnh sửa tài khoản</div>
                        </li>
                        <li class="flex align-center">
                            <img src="https://vi.toeicmax.com/icon/profile.png">
                            <div class="flex" id="passwordChange">Đổi mật khẩu</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="popup" class="nondisplay">
           
        </div>
    `;
}

function renEventListenerForPageSetting()
{
    popup = document.getElementById("popup");
    document.getElementById("inforAccount").addEventListener("click",(e)=>{
        renPopupInforAccount();
        rennEventListenerPopupInforAccount();
    })
    document.getElementById("passwordChange").addEventListener("click",(e)=>{

        renPopupPassword();
        rennEventListenerPopupPassword();
    })
}

//------------------------ ren popup infor account -------------------------------------------------
function renPopupInforAccount()
{
    popup.innerHTML =renHtmlPopupInforAccount(
        checkAuth.data.data
    );
    popup.classList.remove("nondisplay");
}
function renHtmlPopupInforAccount(data)
{
    return `
        <div class="height-100 width-100 flex jus-center ">
            <div class="fix-page">
                <div class="fix-content pop-content height-100">
                    <div class="goback flex flex-wrap align-center mb-20"><span id="closePopup">‹</span><p><b>Chỉnh sửa thông tin</b></p></div>
                    <div class="item mb-20 "><h4 class="fs-14 mb-20">Tài khoản</h4>
                        <div class="border">
                            <ul>
                                <li class="flex flex-wrap mb-20">
                                    <label for="nameInforAcoount">Họ tên: </label>
                                    <input type="text" id="nameInforAcoount" class="form-control" value="${data.name}">
                                </li>
                                <li class="flex flex-wrap mb-20">
                                    <label for="">Số ĐT cũng là tài khoản đăng nhập: </label><input readonly="" disabled="" type="text" class="form-control" value="${data.username}"></li>
                                <li class="div-btn">
                                    <span class="btn btn-action btn-sm" id="updateInforAccount">Cập nhật</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `;
}

function rennEventListenerPopupInforAccount()
{
    document.getElementById("updateInforAccount").addEventListener("click",(e)=>{
        updateInforAccount();
    })
    document.getElementById("closePopup").addEventListener("click",(e)=>{
        popup.classList.add("nondisplay");
    })
}
async function  updateInforAccount() {
    let name = document.getElementById("nameInforAcoount").value;
    let response = await patchAjax("http://127.0.0.1:8080/api/v1/accounts/infor",localStorage.getItem("access_token"),JSON.stringify({
            name:name
        })
    );
    if (response.status >= 200 && response.status < 300) {
        start();
    }else{
        alert(response.message);
    }
}

//------------------------ ren popup popup password -------------------------------------------------
function renPopupPassword()
{
    popup.innerHTML = renHtmlPopupPassword(
        checkAuth.data.data
    );
    popup.classList.remove("nondisplay");
}
function renHtmlPopupPassword(data)
{
    return `
        <div class="height-100 width-100 flex jus-center ">
            <div class="fix-page">
                <div class="fix-content pop-content height-100">
                    <div class="goback flex flex-wrap align-center mb-20"><span id="closePopup">‹</span><p><b>Chỉnh sửa thông tin</b></p></div>
                    <div class="item mb-20 "><h4 class="fs-14 mb-20">Tài khoản</h4>
                        <div class="border">
                            <ul>
                                <li class="flex flex-wrap mb-20">
                                    <label for="oldPassword">Mật khẩu cũ: </label>
                                    <input type="text" id="oldPassword" class="form-control">
                                </li>
                                <li class="flex flex-wrap mb-20">
                                    <label for="newPassword">Mật khẩu mới: </label>
                                    <input type="text" class="form-control" id="newPassword">
                                </li>
                                <li class="flex flex-wrap mb-20">
                                    <label for="verifyNewPassword">Mật khẩu mới: </label>
                                    <input type="text" class="form-control" id="verifyNewPassword">
                                </li>
                                <li class="div-btn">
                                    <span class="btn btn-action btn-sm" id="updateInforAccount">Cập nhật</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    `;
}
function rennEventListenerPopupPassword()
{
    document.getElementById("updateInforAccount").addEventListener("click",(e)=>{
        updatePopupPassword();
    })
    document.getElementById("closePopup").addEventListener("click",(e)=>{
        popup.classList.add("nondisplay");
    })
}
async function  updatePopupPassword() {
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    let verifyNewPassword = document.getElementById("verifyNewPassword").value;
    if(newPassword!=verifyNewPassword)
    {
        alert("Mật khẩu nhập lại không giống");
        return;
    }
    let response = await patchAjax("http://127.0.0.1:8080/api/v1/auths/changepassword",localStorage.getItem("access_token"),JSON.stringify({
            "oldPassword":oldPassword,
            "newPassword":newPassword
        })
    );
    if (response.status >= 200 && response.status < 300) {
        window.location.href='/login';
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }else{
        alert(response.data.message);
    }
}
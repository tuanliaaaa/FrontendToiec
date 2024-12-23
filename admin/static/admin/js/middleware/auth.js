async function checkAccount() {
    if (!localStorage.getItem("access_token")) {
        window.location.href='/admin/login';
    } else {
        const response = await getAjax('http://127.0.0.1:8080/api/v1/accounts/infor', localStorage.getItem("access_token"));
        if (response.status >= 200 && response.status < 300) {
            return true;
        }else if(response.status===401||response.status===403)
        {
            window.location.href='/admin/login';
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

        }
    }
}
import { getAjax, postAjax, patchAjax, deleteAjax } from '/static/home/js/lib/UtilJsonAjax.js';
async function checkAccount(linkLogin) {
    if (!localStorage.getItem("access_token")) {
        window.location.href=`${linkLogin}`;
    } else {
        try {
            const response = await getAjax('http://127.0.0.1:8080/api/v1/accounts/infor', localStorage.getItem("access_token"));
            console.log(response);  
        } catch (error) {
            if (error.status === 0) {
                alert("Không thể kết nối đến máy chủ");
            } else if (error.status === 401 || error.status === 403) {
                localStorage.removeItem("access_token");
                window.location.href=`${linkLogin}`;
            }
        }
    }
}
export {checkAccount}
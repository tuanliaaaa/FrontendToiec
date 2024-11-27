function createAjaxRequest(method, url, token, data = null) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");
        if (token) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve({
                        status: this.status,
                        data: this.status !== 204 ? JSON.parse(this.responseText) : null,
                        message: "Request Success"
                    });
                } else {
                    reject({
                        status: this.status,
                        data: this.responseText ? JSON.parse(this.responseText) : null,
                        message: "Request Failed"
                    });
                }
            }
        };

        xhr.onerror = function () {
            reject({
                status: 0,
                message: "Unable to Connect to the Server"
            });
        };
        xhr.send(data ? JSON.stringify(data) : null);
    });
}

async function getAjax(url, token) {
    return createAjaxRequest("GET", url, token);
}

async function postAjax(url, token, data) {
    return createAjaxRequest("POST", url, token, data);
}

async function patchAjax(url, token, data) {
    return createAjaxRequest("PATCH", url, token, data);
}
async function deleteAjax(url, token) {
    return createAjaxRequest("DELETE", url, token);
}
export { getAjax, postAjax, patchAjax, deleteAjax };

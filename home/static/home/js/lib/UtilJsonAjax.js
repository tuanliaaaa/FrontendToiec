function createAjaxRequest(method, url, data = null,token = null) {
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
                    resolve({
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
        xhr.send(data ? data: null);
    });
}

async function getAjax(url, token) {
    return createAjaxRequest("GET", url, null, token);
}

async function postAjax(url, data, token) {
    return createAjaxRequest("POST", url, data, token);
}

async function patchAjax(url, token, data) {
    return createAjaxRequest("PATCH", url, data, token);
}
async function deleteAjax(url, token) {
    return createAjaxRequest("DELETE", url, null, token);
}

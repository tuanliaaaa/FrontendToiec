if (!localStorage.getItem("access_token")) {
    window.location.href = "/login";
} else {
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
            } else {
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }
    };
    xhr.onerror = function () {
        alert("Không thể kết nối với server. Vui lòng thử lại sau.");
    };
    xhr.send();
}
document.getElementById("chatInput").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
async function sendMessage() {
    const input = document.getElementById("chatInput");
    const messageText = input.value.trim();

    if (messageText === "") return;

    // Add user's message
    const userMessage = document.createElement("div");
    userMessage.classList.add("message", "user");
    userMessage.innerHTML = `<div class="message-content">${messageText}</div>`;
    document.getElementById("chatMessages").appendChild(userMessage);

    // Clear input
    input.value = "";

    // Add typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("typing-indicator");
    typingIndicator.innerHTML = `
        <span></span><span></span><span></span>
    `;
    document.getElementById("chatMessages").appendChild(typingIndicator);

    // Scroll to bottom
    document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;

    let response = await postAjax("http://127.0.0.1:8080/api/v1/chat", JSON.stringify({
      message:messageText
    }), localStorage.getItem('access_token'));
    if (response.status >= 200 && response.status < 300) {
        typingIndicator.remove();

        const botMessage = document.createElement("div");
        botMessage.classList.add("message", "bot");
        botMessage.innerHTML = `<div class="message-content"> ${response.data.message}</div>`;
        document.getElementById("chatMessages").appendChild(botMessage);
        document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
  
    }
}

async function postAjax(url, jsonData, token) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject("Error: " + this.status);
                }
            }
        };
        xhr.send(jsonData);
    });
}

function renderIntroPart(targetElement, data) {
    let template1 = `
        <div class="page-content__top">
            <div class="top__icon">
                <img src="/static/home/img/icons/part1.png">
            </div>
            <div class="top__content" id="history-result">
                <p>Số câu đã làm: <span>${data.completed_questions}</span></p>
                <p>Score: <span>${data.score}</span></p>
            </div>
        </div>
        <div class="page-content__mid">
            <h4>Câu hỏi:</h4>
            <b>For each question in this part, you will hear four statements about a picture in your test book. When you
                hear the statements, you must select the one statement that best describes what you see in the picture.
                Then find the number of the question on your answer sheet and mark your answer. The statements will not
                be printed in your test book and will be spoken only one time.</b>
            <p>Hướng dẫn: Đối với mỗi câu hỏi trong phần này, bạn sẽ nghe bốn câu nói về một bức tranh trong tập kiểm
                tra của mình. Khi nghe các câu phát biểu, bạn phải chọn một câu mô tả đúng nhất những gì bạn nhìn thấy
                trong hình. Sau đó tìm số câu hỏi trên phiếu trả lời và đánh dấu câu trả lời của bạn. Các câu nói sẽ
                không được in trong tập kiểm tra của bạn và sẽ chỉ được nói một lần.</p>
        </div>
        <div class="page-content__bottom">
            <div class="bottom__label">Chọn số lượng câu hỏi.</div>
            <label class="bottom__select">
                <select id="select-qty-question">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </label>
            <div class="btn btn--action" id="btn-start-exam">Bắt đầu ▸</div>
        </div>
    `;
    let template2 = `
        <div class="page-content__top">
            <div class="top__icon">
                <img src="/static/home/img/icons/part2.png" alt="">
            </div>
            <div class="top__content" id="history-result">
                <p>Số câu đã làm: <span>0</span></p>
                <p>Score: <span>0</span></p>
            </div>
        </div>
        <div class="page-content__mid">
            <h4>Câu hỏi:</h4>
            <b>You will hear a question or statement and three responses spoken in English. They will not be printed in
                your text book and will be spoken only one time. Select the best response to the question or statement
                and mark the letter (A), (B) or (C) on your answer sheet.</b>
            <p>Hướng dẫn: Bạn sẽ nghe một câu hỏi hoặc câu phát biểu và ba câu trả lời được nói bằng tiếng Anh. Chúng sẽ
                không được in trong sách giáo khoa của bạn và sẽ chỉ được nói một lần. Chọn câu trả lời đúng nhất cho
                câu hỏi hoặc câu phát biểu và đánh dấu chữ cái (A), (B) hoặc (C) trên phiếu trả lời của bạn.</p>
        </div>
        <div class="page-content__bottom">
            <div class="bottom__label">Chọn số lượng câu hỏi.</div>
            <label class="bottom__select">
                <select id="select-qty-question">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </label>
            <div class="btn btn--action" id="btn-start-exam">Bắt đầu ▸</div>
        </div>
    `;
    let template3 = `
          <div class="page-content__top">
            <div class="top__icon">
                <img src="/static/img/icons/part3.png" alt="">
            </div>
            <div class="top__content" id="history-result">
                <p>Số câu đã làm: <span>0</span></p>
                <p>Score: <span>0</span></p>
            </div>
        </div>
        <div class="page-content__mid">
            <h4>Câu hỏi:</h4>
            <b>You will hear some conversations between two or more people. You will be asked to answer three questions
                about what the speakers say in each conversation. Select the best response to each question and mark the
                letter (A), (B), (C), or (D) on your answer sheet. The conversations will not be printed in your test
                book and will be spoken only one time</b>
            <p>Hướng dẫn: Bạn sẽ nghe một số đoạn hội thoại giữa hai hoặc nhiều người. Bạn sẽ được yêu cầu trả lời ba
                câu hỏi về những gì diễn giả nói trong mỗi cuộc trò chuyện. Chọn câu trả lời đúng nhất cho mỗi câu hỏi
                và đánh dấu chữ cái (A), (B), (C) hoặc (D) trên phiếu trả lời của bạn. Các đoạn hội thoại sẽ không được
                in trong tập kiểm tra của bạn và sẽ chỉ được nói một lần</p>
        </div>
        <div class="page-content__bottom">
            <div class="bottom__label">Chọn số lượng câu hỏi.</div>
            <label class="bottom__select">
                <select id="select-qty-question">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                </select>
            </label>
            <div class="btn btn--action" id="btn-start-exam">Bắt đầu ▸</div>
        </div>
    `;
    let compiledTemplate = template;
    // Kiểm tra xem các key trong data có khớp với những placeholder trong template không
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const regex = new RegExp(`\\$\\{${key}\\}`, 'g'); // Tạo regex động từ key
            compiledTemplate = compiledTemplate.replace(regex, data[key] || ''); // Thay thế tất cả
        }
    }
    targetElement.innerHTML = compiledTemplate;
}

const data = {
    title: "Phần 1: Listening",
    score: 85,
    completed_questions: 5  // Đảm bảo có thuộc tính completed_questions trong data
};


const targetElement = document.getElementById('part');

renderIntroPart(targetElement, data);

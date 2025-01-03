let mainElement = document.getElementById("main");
let partImage = {
    part1: '/static/home/img/icons/part1.png',
    part2: '/static/home/img/icons/part2.png',
    part3: '/static/home/img/icons/part3.png',
    part4: '/static/home/img/icons/part4.png',
    part5: '/static/home/img/icons/part5.png',
    part6: '/static/home/img/icons/part6.png',
    part7: '/static/home/img/icons/part7.png'
};

let checkAuth = checkAccount();
if(checkAuth) renPageHome();

function renPageHome()
{
    mainElement.innerHTML = renHtmlFirstForPageHome();

    renEvenListenerPageHome();
}


function renHtmlFirstForPageHome()
{
    return `
         <div id="header">
            <div class="header__content">
                <b class="fs-18">TOEIC® TUAN</b>
            </div>
        </div>
        <div id="container">
            <div id="containerContent">
                <div id="progress">
                    <div class="mb-10">
                        Học theo lộ trình
                       
                    </div>
                    
                    <div class="btn">
                        <button class="continue-btn" ><a href="/roadmap">Tiếp tục học</a></button>
                    </div>
                </div>
                <div id="lessons">
                    <div id="lessonsByPart">
                        <div class="lessonByPart-item">
                            <div class="title">
                                <h4>Nghe hiểu</h4>
                            </div>
                            <div class="content">
                                <ul>
                                    <li>
                                        <a href="/studybysection/part1">
                                            <span>
                                                <img src="/static/home/img/icons/part1.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 1</b>
                                            </p>
                                            <p class="name">Mô tả hình ảnh</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/studybysection/part2">
                                            <span>
                                                <img src="/static/home/img/icons/part2.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 2</b>
                                            </p>
                                            <p class="name">Hỏi & Đáp</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/studybysection/part3">
                                            <span>
                                                <img src="/static/home/img/icons/part3.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 3</b>
                                            </p>
                                            <p class="name">Đoạn hội thoại</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/studybysection/part4">
                                            <span>
                                                <img src="/static/home/img/icons/part4.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 4</b>
                                            </p>
                                            <p class="name">Bài nói chuyện ngắn</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="lessonByPart-item">
                            <div class="title">
                                <h4>Đọc hiểu</h4>
                            </div>
                            <div class="content">
                                <ul>
                                    <li>
                                        <a href="/studybysection/part5">
                                            <span>
                                                <img src="/static/home/img/icons/part5.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 5</b>
                                            </p>
                                            <p class="name">Điền vào câu</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/studybysection/part6">
                                            <span>
                                                <img src="/static/home/img/icons/part6.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 6</b>
                                            </p>
                                            <p class="name">Điền vào đoạn văn</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/studybysection/part7">
                                            <span>
                                                <img src="/static/home/img/icons/part7.png" alt="">
                                            </span>
                                            <p class="shortName">
                                                <b>Part 7</b>
                                            </p>
                                            <p class="name">Đọc hiểu đoạn văn</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="practice">
                    <div >
                        <div class="lessonByPart-item">
                            <div class="title">
                                <h4>Luyện tập</h4>
                            </div>
                            <div class="content">
                                <ul>
                                    <li>
                                        <a href="/vocabulary">
                                            <span>
                                                <img src="/static/home/img/icons/vocabulary.png" alt="">
                                            </span>
                                            <p class="name">Ôn từ vựng</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/exams">
                                            <span>
                                                <img src="/static/home/img/icons/exam.png" alt="">
                                            </span>
                                            
                                            <p class="name">Thi thử</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="userSetting">
                    <div >
                        <div class="lessonByPart-item">
                            <div class="title">
                                <h4>Cá nhân</h4>
                            </div>
                            <div class="content">
                                <ul>
                                    <li>
                                        <a href="/chatsupport">
                                            <span>
                                                <img src="/static/home/img/icons/part3.png" alt="">
                                            </span>
                                            
                                            <p class="name">Chat Support</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/setting">
                                            <span>
                                                <img src="/static/home/img/icons/setting.png" alt="">
                                            </span>
                                            
                                            <p class="name">Cài đặt</p>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                 <div id="history">
                    <div>
                        <div class="lessonByPart-item">
                            <div class="title">
                                <h4>Lịch sử</h4>
                            </div>
                            <div class="content content-his">
                                <div class="content-tab">
                                    <p class="itemTabHis active" id="hisVocabunary" >Từ vựng</p>
                                    <p class="itemTabHis" id="hisPratice" >Luyện tập</p>
                                    <p class="itemTabHis" id="hisExam" >Thi Thử</p>
                                </div>
                                <div class="content-body" id="hisListContent" >
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="structureToiec">
                <h2 class="title">Cấu trúc đề thi Toeic 2 kỹ năng (LR)</h2>
                <div class="section">
                    <h3 class="sub-title">Phần nghe</h3>
                    <p class="info"><b>100 câu</b> - <b>45 phút</b></p>
                    <div class="line-part">
                        <div class="part part1">
                            <b class="p-name">Part 1</b>
                            <span class="p-quest">6 câu</span>
                            <p class="p-info">
                                <img src="/static/home/img/icons/part1.png"><b>Mô tả hình ảnh</b><i>Nhìn hình, Nghe 4 lựa
                                    chọn → Chọn một đáp án mô tả chính xác nhất nội dung có trong hình</i></p>
                        </div>
                        <div class="part part2"><b class="p-name">Part 2</b><span class="p-quest">25 câu</span>
                            <p class="p-info"><img src="/static/home/img/icons/part2.png"><b>Hỏi &amp; Đáp</b><i>Nghe 1 câu hỏi và 3 câu
                                    trả lời → Chọn một câu hồi đáp phù hợp nhất cho câu hỏi</i></p>
                        </div>
                        <div class="part part3"><b class="p-name">Part 3</b><span class="p-quest">39 câu</span>
                            <p class="p-info">
                                <img src="/static/home/img/icons/part3.png">
                                <b>Đoạn hội thoại</b><i>Nghe đoạn hội thoại,
                                    mỗi đoạn có 3 câu hỏi, mỗi câu có 4 câu trả lời → Chọn câu trả lời phù hợp nhất</i>
                            </p>
                        </div>
                        <div class="part part4"><b class="p-name">Part 4</b><span class="p-quest">30 câu</span>
                            <p class="p-info"><img src="/static/home/img/icons/part4.png"><b>Bài độc thoại</b><i>Nghe đoạn độc thoại, mỗi
                                    đoạn có 3 câu hỏi, mỗi câu có 4 câu trả lời → Chọn câu trả lời phù hợp nhất</i></p>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h3 class="sub-title">Phần đọc</h3>
                    <p class="info"><b>100 câu</b> - <b>75 phút</b></p>
                    <div class="line-part">
                        <div class="part part5"><b class="p-name">Part 5</b><span class="p-quest">30 câu</span>
                            <p class="p-info"><img src="/static/home/img/icons/part5.png"><b>Điền vào câu</b><i>Cho một câu có một chỗ
                                    trống → Chọn một đáp án&nbsp;phù hợp nhất để điền vào chỗ trống</i></p>
                        </div>
                        <div class="part part6"><b class="p-name">Part 6</b><span class="p-quest">16 câu</span>
                            <p class="p-info"><img src="/static/home/img/icons/part6.png"><b>Điền vào đoạn văn</b><i>Cho một đoạn văn có
                                    nhiều&nbsp;chỗ trống&nbsp;→ Chọn một đáp án&nbsp;phù hợp nhất để điền vào chỗ
                                    trống</i></p>
                        </div>
                        <div class="part part7"><b class="p-name">Part 7</b><span class="p-quest">54 câu</span>
                            <p class="p-info"><img src="/static/home/img/icons/part7.png"><b>Đọc hiểu đoạn văn</b><i>Có 15 bài đọc, mỗi
                                    bài có 1,2 hoặc 3 đoạn văn → Bạn đọc câu hỏi và chọn câu trả lời phù hợp nhất cho
                                    câu hỏi</i></p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    `;
}
async function renEvenListenerPageHome()
{


    let hisListContentElement = document.getElementById("hisListContent");
    let hisVocabunaryElement = document.getElementById("hisVocabunary");
    hisVocabunaryElement.addEventListener("click",async ()=>{
        if(!hisVocabunaryElement.classList.contains("active"))
        {
            document.querySelector(".itemTabHis.active").classList.remove("active");
            let htmlHisListContent="";
            let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/vocabularies?size=4&page=0',localStorage.getItem("access_token"));
            console.log("render History: ",response.data);
            if (response.status >= 200 && response.status < 300) {
                htmlHisListContent=response.data.data.map((his,index)=>{
                    return `
                        <div class="lstHistory">
                            <div class="lstHistoryDetail">
                                <a href="/histories/${his.idHistory}" >
                                    <p  class="lstHistoryDetail-image">
                                        <img src="https://vi.toeicmax.com/icon/vocabulary.png">
                                    </p>
                                    <div  class="lstHistoryDetail-content">
                                        <p class="lstHistoryDetail-lesson">
                                            <b>${his.lessonName}</b>
                                        </p>
                                        <span class="lstHistoryDetail-point">
                                            hoàn thành 
                                            ${his.historyDetails.length} 
                                            từ
                                        </span>
                                        
                                        <div class="lstHistoryDetail-process">
                                            <p class="processBar">
                                                <span class="percent" style="width: ${his.score*50}%"></span>
                                            </p>
                                            <p class="processValue">
                                                <b class="cl-green">${his.score*50}%</b>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                }).join('');
            }
            hisListContentElement.innerHTML = htmlHisListContent;
            hisVocabunaryElement.classList.add("active");
        }
    })

    let hisPraticElement = document.getElementById("hisPratice");
    hisPraticElement.addEventListener("click",async()=>{
        if(!hisPraticElement.classList.contains("active"))
        {
            document.querySelector(".itemTabHis.active").classList.remove("active");
            let htmlHisListContent="";
            let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/lessonbypart?&size=4&page=0',localStorage.getItem("access_token"));
            console.log("render History: ",response.data);
            if (response.status >= 200 && response.status < 300) {
                htmlHisListContent=response.data.data.map((his,index)=>{
                    return `
                        <div class="lstHistory">
                            <div class="lstHistoryDetail">
                                <a href="/histories/${his.idHistory}" >
                                    <p  class="lstHistoryDetail-image">
                                        <img src="${partImage[his.type]}">
                                    </p>
                                    <div  class="lstHistoryDetail-content">
                                        <p class="lstHistoryDetail-lesson">
                                            <b>${his.type}</b>
                                        </p>
                                        <span class="lstHistoryDetail-point">
                                            hoàn thành 
                                            ${his.amountQuestionGroup} 
                                            từ
                                        </span>
                                        
                                        <div class="lstHistoryDetail-process">
                                            <p class="processBar">
                                                <span class="percent" style="width: ${his.score*10}%"></span>
                                            </p>
                                            <p class="processValue">
                                                <b class="cl-green">${ Math.round(his.score*10)}%</b>
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    `;
                }).join('');
            }
            hisListContentElement.innerHTML = htmlHisListContent;
            hisPraticElement.classList.add("active");
        }
    }
    )
    

    let hisExamElement = document.getElementById("hisExam");
    hisExamElement.addEventListener("click",async()=>{
            if(!hisExamElement.classList.contains("active"))
            {
                document.querySelector(".itemTabHis.active").classList.remove("active");
                let htmlHisListContent="";
                let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/exam?&size=4&page=0',localStorage.getItem("access_token"));
                console.log("render History: ",response.data);
                if (response.status >= 200 && response.status < 300) {
                    htmlHisListContent=response.data.data.map((his,index)=>{
                        return `
                            <div class="lstHistory">
                                <div class="lstHistoryDetail">
                                    <a href="/histories/${his.idHistory}" >
                                        <p  class="lstHistoryDetail-image">
                                            <img src="/static/home/img/icons/exam.png">
                                        </p>
                                        <div  class="lstHistoryDetail-content">
                                            <p class="lstHistoryDetail-lesson">
                                                <b>${his.type}</b>
                                            </p>
                                            <span class="lstHistoryDetail-point">
                                                hoàn thành với kết quả
                                               ${his.score}
                                            </span>
                                            
                                            <div class="lstHistoryDetail-process">
                                                <p class="processBar">
                                                    <span class="percent" style="width: ${Math.round(his.score/990*100)}%"></span>
                                                </p>
                                                <p class="processValue">
                                                    <b class="cl-green">${ Math.round(his.score/990*100)}%</b>
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        `;
                    }).join('');
                }
                hisListContentElement.innerHTML = htmlHisListContent;
                hisExamElement.classList.add("active");
            }
        }
    )

    // call lần đầu
    let htmlHisListContent="";
    let response = await getAjax('http://127.0.0.1:8080/api/v1/histories/vocabularies?size=4&page=0',localStorage.getItem("access_token"));
    console.log("render History: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        htmlHisListContent=response.data.data.map((his,index)=>{
            return `
                <div class="lstHistory">
                    <div class="lstHistoryDetail">
                        <a href="/histories/${his.idHistory}" >
                            <p  class="lstHistoryDetail-image">
                                <img src="https://vi.toeicmax.com/icon/vocabulary.png">
                            </p>
                            <div  class="lstHistoryDetail-content">
                                <p class="lstHistoryDetail-lesson">
                                    <b>${his.lessonName}</b>
                                </p>
                                <span class="lstHistoryDetail-point">
                                    hoàn thành 
                                    ${his.historyDetails.length} 
                                    từ
                                </span>
                                
                                <div class="lstHistoryDetail-process">
                                    <p class="processBar">
                                        <span class="percent" style="width: ${his.score*50}%"></span>
                                    </p>
                                    <p class="processValue">
                                        <b class="cl-green">${his.score*50}%</b>
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }
    hisListContentElement.innerHTML = htmlHisListContent;

}
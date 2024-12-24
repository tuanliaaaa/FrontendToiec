let mainElement = document.getElementById("main");
let dataJson;
let checkAuth;
start();
async function start()
{
    checkAuth = await checkAccount();
    if(checkAuth)
    {
        renIntroPage();
    }
}

//------------------------------------------------ren Page-------------------------------------------------------
async function renIntroPage()
{
    mainElement.innerHTML = renHtmlIntroPage();
    renEventListenerForIntroPage();
}
async function renExamPage() 
{
    let response = await getAjax(`http://127.0.0.1:8080/api/v1/exams/1`,localStorage.getItem("access_token"));
    console.log("render Exams: ",response.data);
    if (response.status >= 200 && response.status < 300) {
        dataJson=response.data;
    }
    let listQuestion = '',
        countQuestionGroup = 0,countQuestion=1,
        firstItem = true;
    dataJson.data.partResponseList.forEach((questionGroupItem, index) => {
        questionGroupItem.questionGroups.forEach((questionItem) => {
            let listChildQuestion = '';
            let resourceHtml = '';
            if (questionItem.resourceList && questionItem.resourceList.length) {
                questionItem.resourceList.forEach((resourceItem) => {
                    if (resourceItem.resourceType === 'audio') {
                        resourceHtml += `<div class="mid-content__left mid-content__left--audio" data-id="${resourceItem.idResource}">
                        <audio controls="">
                            <source src="${resourceItem.resourceContent}"
                                    type="audio/mpeg">
                        </audio>
                    </div>`;
                    } else if (resourceItem.resourceType === 'image') {
                        resourceHtml += `<div class="mid-content__left mid-content__left--img" data-id="${resourceItem.idResource}">
                        <img src="${resourceItem.resourceContent}">
                    </div>`;
                    }
                })
            }
            questionItem.questionList.forEach((questionChildItem) => {
                let listAnswer = '',
                    labelAnswer = '';
                questionChildItem.answerList.forEach((answerItem, answerIndex) => {
                    listAnswer += `<label class="answer__answer-item" data-index="${answerIndex}" data-id="${answerItem.idAnswer}">
                        <input type="radio" name="radio">
                        <span class="checkmark"></span>${answerItem.answer}
                    </label>`;
                })
                if (questionChildItem.question) {
                    labelAnswer += `<div class="answer__label">${questionChildItem.question}</div>`;
                }
                listChildQuestion += `<div class="mid-content__answer mid-content__answer-${countQuestion}" data-id="${questionChildItem.idQuestion}">
                    ${labelAnswer}
                    <div class="answer__list">
                    ${listAnswer}
                    </div>
                </div>`;
                countQuestion++;
            })
            if (firstItem) {
                listQuestion += `<div class="mid__item active" data-part="${questionGroupItem.part}" data-index="${countQuestionGroup}" style="display: none">
                        <div class="mid__content mid__content--left">
                            ${resourceHtml}
                        </div>
                        <div class="mid__content mid__content--right">
                            ${listChildQuestion}
                        </div>
                    </div>`
                firstItem = false;
            } else {
                listQuestion += `<div class="mid__item" data-part="${questionGroupItem.part}" data-index="${countQuestionGroup}" style="display: none">
                    <div class="mid__content mid__content--left">
                        ${resourceHtml}
                    </div>
                    <div class="mid__content mid__content--right">
                        ${listChildQuestion}
                    </div>
                </div>`
            }
            countQuestionGroup++;
        })
    });
    mainElement.innerHTML = `
        <div class="page-topic-exam" >
                    <div class="page__header">
                        <a class="header__left" href="home.html" id="back-page">
                            <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
                                          fill="#FFFFFF"/>
                                </g>
                            </svg>
                            <div class="header__title" id="show-label-part"><span id="count-question">0</span>/200</div>
                        </a>
                        <div class="header__right">
                            <div class="header__img btn btn--blue">
                                <img src="/static/home/img/demos/warning.png">
                            </div>
                            <a class="btn btn--info" id="show-success">Nộp bài</a>
                            <div class="count-down btn btn--blue" id="countdown-display"></div>
                            <div class=" header__img btn btn--blue" id="show-popup-board">
                                <img src="/static/home/img/demos/menu.png">
                            </div>
                            <div class="popup-board">
                                <div class="board-container nondisplay" id="board-container" >
                                    ${renHtmlQuestionPopupMenu()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="main-content">
                        <div class="page__content">
                            <div class="page-content__top">
                                <div class="top__title">Câu <span id="question-number">1</span></div>
                            </div>
                            <div class="page-content__mid">
                                ${listQuestion}
                            </div>
                        </div>
                    </div>
                </div>
    `;
    let itemActive = document.querySelector('.mid__item.active');
    if (itemActive.querySelector(".mid-content__left--audio audio")) {
        itemActive.querySelector(".mid-content__left--audio audio").play();
    }
    document.querySelector('#question-number').textContent = 1;
    document.querySelector('#count-question').textContent = 1;
    startExam();
    clearInterval(window.timePlayExamInterval);
    timePlayExam()
    renEvenListenerForExamPage();
}



//------------------------------------------------Page Intro ---------------------------------------------------
function renHtmlIntroPage()
{
   return `
        <div class="page-container">
            <div class="page-content-block page-topic-exam-block" id="page-topic-exam-block">
                <div class="page-topic-options">
                    <div class="page__content">
                        <div class="page__topic-options">
                            <div class="topic-options__top">
                                <b>Đề: ETS 01 2024</b>
                                <p>Số câu hỏi: <b>200</b></p>
                                <p>Thời gian làm: <b>120 phút</b></p>
                            </div>
                            <img class="topic-options__img" src="/static/home/img/icons/frog_start.png">
                            <div class="topic-options__confirm">
                                <input type="checkbox">
                                <span>Bật chế độ như thi thật, chỉ áp dụng khi làm Full đề</span>
                            </div>
                        </div>
                    </div>
                    <div class="page__footer page__footer--success">
                        <div class="footer__action">
                            <a class="btn btn--continue" id="start-exam">Luyện tập</a>
                            <a class="btn btn--action" href="home.html">Quay lại</a>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="page-content-block page-exam-success-content" id="page-exam-success-content" style="display: none"></div>
        </div>
   `;
}
function renEventListenerForIntroPage()
{
    document.querySelector('#start-exam').addEventListener('click',async function () {
        renExamPage();
    });
}
function renPageResult()
{
    mainElement.classList.add('page-exam-success');
    mainElement.innerHTML = `
        <div class="page-container">
            <div class="page__content">
                <div class="page__exam-success">
                    <div class="exam-success__top">
                        <img src="/static/img/icons/success.png" alt="">
                        <b>Chúc mừng</b>
                        <span>Bạn đã hoàn thành bài luyện tập của mình</span>
                    </div>
                    <div class="exam-success__bottom">
                        <div class="exam-success__notify">
                            <img src="/static/img/icons/warning_c.png" alt="">
                            <p>Bạn cần <span>Đăng nhập</span> để lưu lại lịch sử học tập</p>
                        </div>
                        <div class="exam-success__result">
                            <b>Kết quả: <span id="result-label"></span></b>
                            <div class="result__popup">
                                <div class="result-popup__top">
                                    <span>Tỷ lệ dúng</span>
                                    <span id="percent-result">0%</span>
                                </div>
                                <div class="result-popup__percent">
                                    <div class="percent__result" style="width: 0"></div>
                                </div>
                                <b>Hãy cố gắng nhiều hơn nữa nhé!</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page__footer page__footer--success">
                <div class="footer__action">
                    <a class="btn btn--continue" href="/result">Xem kết quả</a>
                    <a class="btn btn--continue" id="btn-continue" href="/home">Tiếp tục</a>
                    <a class="btn btn--action" href="javascript:location.reload()" id="btn-replay">Làm lại</a>
                </div>
            </div>
        </div>
    `;
}

//------------------------------------------------Page Exam ----------------------------------------------------
function renEvenListenerForExamPage()
{

    // Sự kiện chọn đáp án
    let answersButton = document.querySelectorAll('.answer__answer-item input');
    answersButton.forEach(answerButton => {
        answerButton.addEventListener("change", function () {
            let listAnswerEle = parents(this, '.answer__list');
            let answerBlock = parents(this, '.mid-content__answer');
            let itemQuestionActive = document.querySelector('.mid__item.active'),
                dataPart = itemQuestionActive.dataset.part;
            document.querySelector('#board-container .question-' + answerBlock[0].dataset.id).classList.add('ans');
            if (dataPart === 'part5' || dataPart === 'part6' || dataPart === 'part7') {
                listAnswerEle[0].classList.add('active');
                listAnswerEle[0].querySelectorAll('.answer__answer-item').forEach(item => {
                    item.classList.remove('choose-answer');
                })
                this.parentElement.classList.add('choose-answer');
                setTimeout(function () {
                    let itemQuestion = document.querySelectorAll('.mid__item'),
                        index = parseInt(itemQuestionActive.dataset.index) + 1;
                    if (itemQuestion[index]) {
                        itemQuestionActive.classList.remove('active');
                        itemQuestion[index].classList.add('active');
                        document.querySelector('#question-number').textContent = index + 1;
                        document.querySelector('#count-question').textContent = index + 1;
                    }
                }, 2000)
            } else {
                if (!listAnswerEle[0].classList.contains('active')) {
                    listAnswerEle[0].classList.add('active');
                    this.parentElement.classList.add('choose-answer');

                }
            }
        });
    });

    // Sự kiện mở popupQuestionMenu
    let boardContainerElemnt = document.getElementById("board-container");
    document.getElementById("show-popup-board").addEventListener("click",(e)=>{
        let itemQuestionActive = document.querySelector('.mid__item.active');
        let index = parseInt(itemQuestionActive.dataset.index) + 1;
        if( index>53)
            if(boardContainerElemnt.classList.contains("nondisplay"))
                boardContainerElemnt.classList.remove("nondisplay");
            else boardContainerElemnt.classList.add("nondisplay");
    })


    // sự kiện click vào tưng ô trong menu question
    let questionMenuElementLst = document.querySelectorAll('.popupMenuQuestion');
    questionMenuElementLst.forEach((questionMenuElement)=>{
        questionMenuElement.addEventListener('click', function (evt) {
            console.log("clicked to Element: ",evt.target);
            if (evt.target.classList.contains('action')) {
                clearInterval(window.timePlayExamInterval);
                    itemQuestionActive = document.querySelector('.mid__item.active');
                    indexElement = document.querySelector('.mid-content__answer-' + evt.target.dataset.index).closest(".mid__item");
                console.log("indexElement: ",indexElement);
                    if (indexElement) {
                    itemQuestionActive.classList.remove('active');
                    indexElement.classList.add('active');
                    document.querySelector('#question-number').textContent = index;
                    document.querySelector('#count-question').textContent = index;
                }
            }
        });
    })

    // Sự kiện nộp bài
    document.getElementById('show-success').addEventListener('click', function (){
        renPageResult();
        clearInterval(window.countdownInterval);
    })
}

//----------------------------------------------Ren Html By Part -----------------------------------------------
function part1(part)
{
    
}
function renHtmlQuestionPopupMenu()
{
    return `
        <div class="note">
            <div class="bg-green"></div>
            Màu xanh là câu đã trả lời
        </div>
        <h4>Part 1</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion question-1" data-index="1">1</span>
            <span class="question popupMenuQuestion question-2" data-index="2">2</span>
            <span class="question popupMenuQuestion question-3" data-index="3">3</span>
            <span class="question popupMenuQuestion question-4" data-index="4">4</span>
            <span class="question popupMenuQuestion question-5" data-index="5">5</span>
            <span class="question popupMenuQuestion question-6" data-index="6">6</span>
        </div>
        <h4>Part 2</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion question-7" data-index="7">7</span>
            <span class="question popupMenuQuestion question-8" data-index="8">8</span>
            <span class="question popupMenuQuestion question-9" data-index="9">9</span>
            <span class="question popupMenuQuestion question-10" data-index="10">10</span>
            <span class="question popupMenuQuestion question-11" data-index="11">11</span>
            <span class="question popupMenuQuestion question-12" data-index="12">12</span>
            <span class="question popupMenuQuestion question-13" data-index="13">13</span>
            <span class="question popupMenuQuestion question-14" data-index="14">14</span>
            <span class="question popupMenuQuestion question-15" data-index="15">15</span>
            <span class="question popupMenuQuestion question-16" data-index="16">16</span>
            <span class="question popupMenuQuestion question-17" data-index="17">17</span>
            <span class="question popupMenuQuestion question-18" data-index="18">18</span>
            <span class="question popupMenuQuestion question-19" data-index="19">19</span>
            <span class="question popupMenuQuestion question-20" data-index="20">20</span>
            <span class="question popupMenuQuestion question-21" data-index="21">21</span>
            <span class="question popupMenuQuestion question-22" data-index="22">22</span>
            <span class="question popupMenuQuestion question-23" data-index="23">23</span>
            <span class="question popupMenuQuestion question-24" data-index="24">24</span>
            <span class="question popupMenuQuestion question-25" data-index="25">25</span>
            <span class="question popupMenuQuestion question-26" data-index="26">26</span>
            <span class="question popupMenuQuestion question-27" data-index="27">27</span>
            <span class="question popupMenuQuestion question-28" data-index="28">28</span>
            <span class="question popupMenuQuestion question-29" data-index="29">29</span>
            <span class="question popupMenuQuestion question-30" data-index="30">30</span>
            <span class="question popupMenuQuestion question-31" data-index="31">31</span>
        </div>
        <h4>Part 3</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion question-32" data-index="32">32</span>
            <span class="question popupMenuQuestion question-33" data-index="33">33</span>
            <span class="question popupMenuQuestion question-34" data-index="34">34</span>
            <span class="question popupMenuQuestion question-35" data-index="35">35</span>
            <span class="question popupMenuQuestion question-36" data-index="36">36</span>
            <span class="question popupMenuQuestion question-37" data-index="37">37</span>
            <span class="question popupMenuQuestion question-38" data-index="38">38</span>
            <span class="question popupMenuQuestion question-39" data-index="39">39</span>
            <span class="question popupMenuQuestion question-40" data-index="40">40</span>
            <span class="question popupMenuQuestion question-41" data-index="41">41</span>
            <span class="question popupMenuQuestion question-42" data-index="42">42</span>
            <span class="question popupMenuQuestion question-43" data-index="43">43</span>
            <span class="question popupMenuQuestion question-44" data-index="44">44</span>
            <span class="question popupMenuQuestion question-45" data-index="45">45</span>
            <span class="question popupMenuQuestion question-46" data-index="46">46</span>
            <span class="question popupMenuQuestion question-47" data-index="47">47</span>
            <span class="question popupMenuQuestion question-48" data-index="48">48</span>
            <span class="question popupMenuQuestion question-49" data-index="49">49</span>
            <span class="question popupMenuQuestion question-50" data-index="50">50</span>
            <span class="question popupMenuQuestion question-51" data-index="51">51</span>
            <span class="question popupMenuQuestion question-52" data-index="52">52</span>
            <span class="question popupMenuQuestion question-53" data-index="53">53</span>
            <span class="question popupMenuQuestion question-54" data-index="54">54</span>
            <span class="question popupMenuQuestion question-55" data-index="55">55</span>
            <span class="question popupMenuQuestion question-56" data-index="56">56</span>
            <span class="question popupMenuQuestion question-57" data-index="57">57</span>
            <span class="question popupMenuQuestion question-58" data-index="58">58</span>
            <span class="question popupMenuQuestion question-59" data-index="59">59</span>
            <span class="question popupMenuQuestion question-60" data-index="60">60</span>
            <span class="question popupMenuQuestion question-61" data-index="61">61</span>
            <span class="question popupMenuQuestion question-62" data-index="62">62</span>
            <span class="question popupMenuQuestion question-63" data-index="63">63</span>
            <span class="question popupMenuQuestion question-64" data-index="64">64</span>
            <span class="question popupMenuQuestion question-65" data-index="65">65</span>
            <span class="question popupMenuQuestion question-66" data-index="66">66</span>
            <span class="question popupMenuQuestion question-67" data-index="67">67</span>
            <span class="question popupMenuQuestion question-68" data-index="68">68</span>
            <span class="question popupMenuQuestion question-69" data-index="69">69</span>
            <span class="question popupMenuQuestion question-70" data-index="70">70</span></div>
        <h4>Part 4</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion question-71" data-index="71">71</span>
            <span class="question popupMenuQuestion question-72" data-index="72">72</span>
            <span class="question popupMenuQuestion question-73" data-index="73">73</span>
            <span class="question popupMenuQuestion question-74" data-index="74">74</span>
            <span class="question popupMenuQuestion question-75" data-index="75">75</span>
            <span class="question popupMenuQuestion question-76" data-index="76">76</span>
            <span class="question popupMenuQuestion question-77" data-index="77">77</span>
            <span class="question popupMenuQuestion question-78" data-index="78">78</span>
            <span class="question popupMenuQuestion question-79" data-index="79">79</span>
            <span class="question popupMenuQuestion question-80" data-index="80">80</span>
            <span class="question popupMenuQuestion question-81" data-index="81">81</span>
            <span class="question popupMenuQuestion question-82" data-index="82">82</span>
            <span class="question popupMenuQuestion question-83" data-index="83">83</span>
            <span class="question popupMenuQuestion question-84" data-index="84">84</span>
            <span class="question popupMenuQuestion question-85" data-index="85">85</span>
            <span class="question popupMenuQuestion question-86" data-index="86">86</span>
            <span class="question popupMenuQuestion question-87" data-index="87">87</span>
            <span class="question popupMenuQuestion question-88" data-index="88">88</span>
            <span class="question popupMenuQuestion question-89" data-index="89">89</span>
            <span class="question popupMenuQuestion question-90" data-index="90">90</span>
            <span class="question popupMenuQuestion question-91" data-index="91">91</span>
            <span class="question popupMenuQuestion question-92" data-index="92">92</span>
            <span class="question popupMenuQuestion question-93" data-index="93">93</span>
            <span class="question popupMenuQuestion question-94" data-index="94">94</span>
            <span class="question popupMenuQuestion question-95" data-index="95">95</span>
            <span class="question popupMenuQuestion question-96" data-index="96">96</span>
            <span class="question popupMenuQuestion question-97" data-index="97">97</span>
            <span class="question popupMenuQuestion question-98" data-index="98">98</span>
            <span class="question popupMenuQuestion question-99" data-index="99">99</span>
            <span class="question popupMenuQuestion question-100" data-index="100">100</span></div>
        <h4>Part 5</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion action question-101" data-index="101">101</span>
            <span class="question popupMenuQuestion action question-102" data-index="102">102</span>
            <span class="question popupMenuQuestion action question-103" data-index="103">103</span>
            <span class="question popupMenuQuestion action question-104" data-index="104">104</span>
            <span class="question popupMenuQuestion action question-105" data-index="105">105</span>
            <span class="question popupMenuQuestion action question-106" data-index="106">106</span>
            <span class="question popupMenuQuestion action question-107" data-index="107">107</span>
            <span class="question popupMenuQuestion action question-108" data-index="108">108</span>
            <span class="question popupMenuQuestion action question-109" data-index="109">109</span>
            <span class="question popupMenuQuestion action question-110" data-index="110">110</span>
            <span class="question popupMenuQuestion action question-111" data-index="111">111</span>
            <span class="question popupMenuQuestion action question-112" data-index="112">112</span>
            <span class="question popupMenuQuestion action question-113" data-index="113">113</span>
            <span class="question popupMenuQuestion action question-114" data-index="114">114</span>
            <span class="question popupMenuQuestion action question-115" data-index="115">115</span>
            <span class="question popupMenuQuestion action question-116" data-index="116">116</span>
            <span class="question popupMenuQuestion action question-117" data-index="117">117</span>
            <span class="question popupMenuQuestion action question-118" data-index="118">118</span>
            <span class="question popupMenuQuestion action question-119" data-index="119">119</span>
            <span class="question popupMenuQuestion action question-120" data-index="120">120</span>
            <span class="question popupMenuQuestion action question-121" data-index="121">121</span>
            <span class="question popupMenuQuestion action question-122" data-index="122">122</span>
            <span class="question popupMenuQuestion action question-123" data-index="123">123</span>
            <span class="question popupMenuQuestion action question-124" data-index="124">124</span>
            <span class="question popupMenuQuestion action question-125" data-index="125">125</span>
            <span class="question popupMenuQuestion action question-126" data-index="126">126</span>
            <span class="question popupMenuQuestion action question-127" data-index="127">127</span>
            <span class="question popupMenuQuestion action question-128" data-index="128">128</span>
            <span class="question popupMenuQuestion action question-129" data-index="129">129</span>
            <span class="question popupMenuQuestion action question-130" data-index="130">130</span></div>
        <h4>Part 6</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion action question-131" data-index="131">131</span>
            <span class="question popupMenuQuestion action question-132" data-index="132">132</span>
            <span class="question popupMenuQuestion action question-133" data-index="133">133</span>
            <span class="question popupMenuQuestion action question-134" data-index="134">134</span>
            <span class="question popupMenuQuestion action question-135" data-index="135">135</span>
            <span class="question popupMenuQuestion action question-136" data-index="136">136</span>
            <span class="question popupMenuQuestion action question-137" data-index="137">137</span>
            <span class="question popupMenuQuestion action question-138" data-index="138">138</span>
            <span class="question popupMenuQuestion action question-139" data-index="139">139</span>
            <span class="question popupMenuQuestion action question-140" data-index="140">140</span>
            <span class="question popupMenuQuestion action question-141" data-index="141">141</span>
            <span class="question popupMenuQuestion action question-142" data-index="142">142</span>
            <span class="question popupMenuQuestion action question-143" data-index="143">143</span>
            <span class="question popupMenuQuestion action question-144" data-index="144">144</span>
            <span class="question popupMenuQuestion action question-145" data-index="145">145</span>
            <span class="question popupMenuQuestion action question-146" data-index="146">146</span></div>
        <h4>Part 7</h4>
        <div class="board-part">
            <span class="question popupMenuQuestion action question-147" data-index="147">147</span>
            <span class="question popupMenuQuestion action question-148" data-index="148">148</span>
            <span class="question popupMenuQuestion action question-149" data-index="149">149</span>
            <span class="question popupMenuQuestion action question-150" data-index="150">150</span>
            <span class="question popupMenuQuestion action question-151" data-index="151">151</span>
            <span class="question popupMenuQuestion action question-152" data-index="152">152</span>
            <span class="question popupMenuQuestion action question-153" data-index="153">153</span>
            <span class="question popupMenuQuestion action question-154" data-index="154">154</span>
            <span class="question popupMenuQuestion action question-155" data-index="155">155</span>
            <span class="question popupMenuQuestion action question-156" data-index="156">156</span>
            <span class="question popupMenuQuestion action question-157" data-index="157">157</span>
            <span class="question popupMenuQuestion action question-158" data-index="158">158</span>
            <span class="question popupMenuQuestion action question-159" data-index="159">159</span>
            <span class="question popupMenuQuestion action question-160" data-index="160">160</span>
            <span class="question popupMenuQuestion action question-161" data-index="161">161</span>
            <span class="question popupMenuQuestion action question-162" data-index="162">162</span>
            <span class="question popupMenuQuestion action question-163" data-index="163">163</span>
            <span class="question popupMenuQuestion action question-164" data-index="164">164</span>
            <span class="question popupMenuQuestion action question-165" data-index="165">165</span>
            <span class="question popupMenuQuestion action question-166" data-index="166">166</span>
            <span class="question popupMenuQuestion action question-167" data-index="167">167</span>
            <span class="question popupMenuQuestion action question-168" data-index="168">168</span>
            <span class="question popupMenuQuestion action question-169" data-index="169">169</span>
            <span class="question popupMenuQuestion action question-170" data-index="170">170</span>
            <span class="question popupMenuQuestion action question-171" data-index="171">171</span>
            <span class="question popupMenuQuestion action question-172" data-index="172">172</span>
            <span class="question popupMenuQuestion action question-173" data-index="173">173</span>
            <span class="question popupMenuQuestion action question-174" data-index="174">174</span>
            <span class="question popupMenuQuestion action question-175" data-index="175">175</span>
            <span class="question popupMenuQuestion action question-176" data-index="176">176</span>
            <span class="question popupMenuQuestion action question-177" data-index="177">177</span>
            <span class="question popupMenuQuestion action question-178" data-index="178">178</span>
            <span class="question popupMenuQuestion action question-179" data-index="179">179</span>
            <span class="question popupMenuQuestion action question-180" data-index="180">180</span>
            <span class="question popupMenuQuestion action question-181" data-index="181">181</span>
            <span class="question popupMenuQuestion action question-182" data-index="182">182</span>
            <span class="question popupMenuQuestion action question-183" data-index="183">183</span>
            <span class="question popupMenuQuestion action question-184" data-index="184">184</span>
            <span class="question popupMenuQuestion action question-185" data-index="185">185</span>
            <span class="question popupMenuQuestion action question-186" data-index="186">186</span>
            <span class="question popupMenuQuestion action question-187" data-index="187">187</span>
            <span class="question popupMenuQuestion action question-188" data-index="188">188</span>
            <span class="question popupMenuQuestion action question-189" data-index="189">189</span>
            <span class="question popupMenuQuestion action question-190" data-index="190">190</span>
            <span class="question popupMenuQuestion action question-191" data-index="191">191</span>
            <span class="question popupMenuQuestion action question-192" data-index="192">192</span>
            <span class="question popupMenuQuestion action question-193" data-index="193">193</span>
            <span class="question popupMenuQuestion action question-194" data-index="194">194</span>
            <span class="question popupMenuQuestion action question-195" data-index="195">195</span>
            <span class="question popupMenuQuestion action question-196" data-index="196">196</span>
            <span class="question popupMenuQuestion action question-197" data-index="197">197</span>
            <span class="question popupMenuQuestion action question-198" data-index="198">198</span>
            <span class="question popupMenuQuestion action question-199" data-index="199">199</span>
            <span class="question popupMenuQuestion action question-200" data-index="200">200</span>
        </div>
    `;
}

//-----------------------------------------------Function khac--------------------------------------------------

function startExam() {
    const countdownDisplay = document.getElementById("countdown-display");
    let totalSeconds = 7199;

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    clearInterval(window.countdownInterval);

    window.countdownInterval = setInterval(() => {
        if (totalSeconds > 0) {
            countdownDisplay.textContent = formatTime(totalSeconds);
            totalSeconds--;
        } else {
            showPageSuccess()
            clearInterval(window.countdownInterval);
        }
    }, 1000);

   
}




function parents(element, selector) {
    const results = [];
    let currentElement = element.parentElement;

    while (currentElement) {
        if (currentElement.matches(selector)) {
            results.push(currentElement);
        }
        currentElement = currentElement.parentElement;
    }

    return results;
}

function timePlayExam() {
    let totalSeconds1 = 0;
    window.timePlayExamInterval = setInterval(() => {
        if (totalSeconds1 > 0) {
            totalSeconds1--;
        } else {
            nextQuestion();
        }
    }, 10);
}

function nextQuestion() {
    let itemQuestion = document.querySelectorAll('.mid__item'),
        itemQuestionActive = document.querySelector('.mid__item.active'),
        index = parseInt(itemQuestionActive.dataset.index) + 1;
    if (!itemQuestionActive.querySelector('.answer__answer-item.choose-answer')) {
        document.querySelector('#board-container .question:not(.ans):not(.not-ans)').classList.add('not-ans');
    }
    if (itemQuestion[index]) {
        itemQuestionActive.classList.remove('active');
        itemQuestion[index].classList.add('active');
        document.querySelector('#question-number').textContent = index + 1;
        document.querySelector('#count-question').textContent = index + 1;
        clearInterval(window.timePlayExamInterval);
        if (itemQuestion[index].dataset.index<101) {
            itemQuestion[index].querySelector(".mid-content__left--audio audio").play();
            timePlayExam();
        }
    } else {
        console.log("aas1");

        clearInterval(window.timePlayExamInterval);
    }
}



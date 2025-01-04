function eventForBtnQGDetail(){
    // Collapse Button
    const btnCollapse = document.querySelectorAll('.btn-collapse');
    btnCollapse.forEach(btn => {
        btn.addEventListener('click', () => {
            // closest .day-box__content
            const content = btn.closest('.day-box').querySelector('.day-box__content');
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                btn.innerHTML = '<i class="fa-solid fa-minus"></i>';
            } else {
                btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
                content.classList.add('no-active');
            }
        })
    })

    // Clear Button: Clear all input 
    let btnClear = document.querySelectorAll('.btn-clear');
    btnClear.forEach(btn => {
        btn.addEventListener('click', () => {
            let qsGroupQuestionClickedClear = btn.closest('.day-box');
            let contenQsGroupQuestionClickedClear=qsGroupQuestionClickedClear.querySelector('.day-box__content');
            contenQsGroupQuestionClickedClear.innerHTML='';
            let dataIndex = qsGroupQuestionClickedClear.getAttribute('data-index');
            let suffix = dataIndex.split('-')[1];
            listQuestionGroup = listQuestionGroup.filter(item => item !== mapQuestionGroup[suffix]);
            mapQuestionGroup[suffix]=null;
            console.log(mapQuestionGroup);
        });
    });
}


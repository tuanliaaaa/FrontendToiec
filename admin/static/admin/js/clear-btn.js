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
const btnClear = document.querySelectorAll('.btn-clear');
btnClear.forEach(btn => {
    btn.addEventListener('click', () => {
        const answerInputs = btn.closest('.day-box').querySelectorAll('input[type="text"]');
        answerInputs.forEach(input => {
            input.value = '';
        });

        const correctAnswers = btn.closest('.day-box').querySelectorAll('input[type="radio"]');
        correctAnswers.forEach(input => {
            input.checked = false;
        });

        const uploadImgs = btn.closest('.day-box').querySelectorAll('input[name="upload-img"]');
        uploadImgs.forEach(input => {
            input.value = '';
            const uploadImg = input.closest('.resource__item').querySelector('.resource__item--upload-img');
            uploadImg.style.backgroundImage = '';
            uploadImg.textContent = 'Upload Image';
        });

        const uploadAudios = btn.closest('.day-box').querySelectorAll('input[name="upload-audio"]');
        uploadAudios.forEach(input => {
            input.value = '';
            const uploadAudio = input.closest('.resource__item').querySelector('.resource__item--upload-audio');
            uploadAudio.textContent = 'Upload Audio';
            const audio = input.closest('.resource__item').querySelector('audio');
            if (audio) {
                audio.remove();
            }
        });

        const uploadDocs = btn.closest('.day-box').querySelectorAll('input[name="upload-doc"]');
        uploadDocs.forEach(input => {
            input.value = '';
            const uploadDoc = input.closest('.resource__item').querySelector('.resource__item--upload-doc');
            uploadDoc.textContent = 'Upload Document';
            const docxPreviews = input.closest('.resource__item').querySelectorAll('.docx-preview');
            docxPreviews.forEach(preview => {
                preview.remove();
            });
        });
    });
});
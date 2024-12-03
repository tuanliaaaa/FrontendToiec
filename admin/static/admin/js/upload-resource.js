// Add and Preview Audio
document.querySelectorAll('.resource__item').forEach(item => {
    console.log(item);
    // upload image
    const uploadImg = item.querySelector('.resource__item--upload-img');
    if (uploadImg) {
        const inputImg = item.querySelector('input[name="upload-img"]');
        const uploadImgText = uploadImg;

        inputImg.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    const result = reader.result;
                    uploadImg.style.backgroundImage = `url(${result})`;
                    uploadImg.style.backgroundSize = 'cover';
                    uploadImgText.textContent = '';
                }
                reader.readAsDataURL(file);
            }
        });

        uploadImg.addEventListener('click', () => {
            inputImg.click();
        });
    };


    // upload audio
    const uploadAudio = item.querySelector('.resource__item--upload-audio');
    if (uploadAudio) {
        const inputAudio = item.querySelector('input[name="upload-audio"]');

        uploadAudio.addEventListener('click', () => {
            inputAudio.click();
        });
        console.log('uploadAudio', uploadAudio);

        inputAudio.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function () {
                    const result = reader.result;
                    const audio = document.createElement('audio');
                    audio.setAttribute('controls', '');
                    audio.setAttribute('src', result);

                    // style audio
                    audio.style.width = '100%';
                    audio.style.marginTop = '10px';
                    audio.style.borderRadius = '12px';

                    // Remove old audio if exists
                    const existingAudio = item.querySelector('audio');
                    if (existingAudio) {
                        existingAudio.remove();
                    }

                    // append audio to uploadAudio
                    item.appendChild(audio);
                }
                reader.readAsDataURL(file);
            }
        });
    };

    // upload docs and preview
    const uploadDoc = item.querySelector('.resource__item--upload-doc');
    if (uploadDoc) {
        const inputDoc = item.querySelector('input[name="upload-doc"]');
        const previewContainer = item.querySelector('.preview-container') || document.createElement('div');
        previewContainer.classList.add('preview-container');
        item.appendChild(previewContainer);

        inputDoc.addEventListener('change', function () {
            const files = this.files;
            if (files.length > 0) {
                // Clear existing preview content
                previewContainer.innerHTML = '';

                Array.from(files).forEach(file => {
                    const docxPreview = document.createElement('div');
                    docxPreview.classList.add('docx-preview');
                    previewContainer.appendChild(docxPreview);

                    const options = { inWrapper: false, ignoreWidth: true, ignoreHeight: true };
                    docx.renderAsync(file, docxPreview, null, options)
                        .then(() => {
                            console.log("docx: finished");

                            // Apply inline styles to .docx element inside .docx-preview
                            const docxElement = docxPreview.querySelector('.docx');
                            if (docxElement) {
                                docxElement.style.padding = '10px';
                                docxElement.style.border = '1px solid #ccc';
                                docxElement.style.borderRadius = '12px';
                                docxElement.style.marginTop = '8px';
                            }
                        })
                        .catch(err => {
                            console.error("Error rendering DOCX:", err);
                        });

                    // Replace "Upload doc" text with file name
                    uploadDoc.textContent = file.name;
                });
            }
        });

        uploadDoc.addEventListener('click', () => {
            inputDoc.click();
        });
    }
});
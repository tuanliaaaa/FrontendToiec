document.querySelectorAll('.question-answer__container').forEach((container, index) => {
    const question = container.querySelector('.question');
    // remove the existing .no-question element
    const existingNoQuestion = question.querySelector('span');
    if (existingNoQuestion) {
        existingNoQuestion.remove();
    }
    const numero = document.createElement('span');
    if (numero) {
        numero.textContent = `${noQuestion + 1}`;
    }
    noQuestion++;
    question.insertBefore(numero, question.firstChild);
});
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('difficulty-form')) {
        const apiKey = 'OQqoznRXVDJ2bUXtHPUh6R6iAgjuak2H5YxosRlX';
        const apiUrl = 'https://quizapi.io/api/v1/questions';
        const difficultyForm = document.getElementById('difficulty-form');
        const quizContainer = document.getElementById('quiz-container');
        const correctCountElem = document.getElementById('correct-count');
        const incorrectCountElem = document.getElementById('incorrect-count');
        const resetStatsButton = document.getElementById('reset-stats');

        let correctCount = parseInt(localStorage.getItem('correctCount')) || 0;
        let incorrectCount = parseInt(localStorage.getItem('incorrectCount')) || 0;

        correctCountElem.textContent = correctCount;
        incorrectCountElem.textContent = incorrectCount;

        difficultyForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const difficulty = document.getElementById('difficulty').value;
            const response = await fetch(`${apiUrl}?apiKey=${apiKey}&limit=1&difficulty=${difficulty}`);
            const data = await response.json();
            displayQuestion(data[0]);
        });

        resetStatsButton.addEventListener('click', () => {
            correctCount = 0;
            incorrectCount = 0;
            localStorage.setItem('correctCount', correctCount);
            localStorage.setItem('incorrectCount', incorrectCount);
            correctCountElem.textContent = correctCount;
            incorrectCountElem.textContent = incorrectCount;
        });

        function displayQuestion(question) {
            quizContainer.innerHTML = `
                <p>${question.question}</p>
                <form id="quiz-form">
                    ${Object.keys(question.answers).map(key => {
                        if (question.answers[key]) {
                            return `<div>
                                        <input type="radio" name="answer" value="${key}" id="${key}">
                                        <label for="${key}">${question.answers[key]}</label>
                                    </div>`;
                        }
                        return '';
                    }).join('')}
                    <button type="submit">Submit Answer</button>
                </form>
            `;

            const quizForm = document.getElementById('quiz-form');
            quizForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const selectedAnswer = quizForm.elements['answer'].value;
                const isCorrect = question.correct_answers[selectedAnswer + '_correct'] === 'true';
                if (isCorrect) {
                    correctCount++;
                    alert('Correct!');
                } else {
                    incorrectCount++;
                    alert('Incorrect!');
                }
                localStorage.setItem('correctCount', correctCount);
                localStorage.setItem('incorrectCount', incorrectCount);
                correctCountElem.textContent = correctCount;
                incorrectCountElem.textContent = incorrectCount;
                quizContainer.innerHTML = '';
            });
        }
    }
});

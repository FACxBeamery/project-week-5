document.getElementById("submit-question").addEventListener("click", submitQuestion);

const displayQuestions = (questionsArray) => {
    resetQuestionContainer();
    const questionsContainer = document.getElementById("questions-container");
    questionsArray.forEach((question) => questionsContainer.appendChild(renderQuestion(question)));
};

const renderQuestion = (question) => {
    const questionWrapper = document.createElement("div");
    questionWrapper.classList.add("question-wrapper__question-wrapper");

    const questionTitle = document.createElement("p");
    questionTitle.classList.add("question-wrapper__question-title");
    questionTitle.textContent = question.questionTitle;

    const questionDetailContainer = document.createElement("div");
    questionDetailContainer.classList.add("question-wrapper__question-detail-container");

    const questionOwner = document.createElement("p");
    questionOwner.classList.add("question-wrapper__question-owner");
    questionOwner.textContent = question.questionOwner;
    questionDetailContainer.appendChild(questionOwner);

    const week = document.createElement("p");
    week.textContent = question.week;
    questionDetailContainer.appendChild(week);
    week.classList.add("question-wrapper__week");

    const answersContainer = document.createElement("div");
    answersContainer.classList.add("question-wrapper__answers-container");
    question.answers.forEach((answer) => answersContainer.appendChild(renderAnswer(answer)));

    questionWrapper.appendChild(questionTitle);
    questionWrapper.appendChild(questionDetailContainer);
    questionWrapper.appendChild(answersContainer);

    return questionWrapper;
};

const renderAnswer = (answer) => {
    const answerWrapper = document.createElement("div");
    answerWrapper.classList.add("answer-wrapper");

    const answerText = document.createElement("p");
    answerWrapper.classList.add("answer-wrapper__answer-text");
    answerText.textContent = answer.answerTitle;

    const answerOwner = document.createElement("p");
    answerWrapper.classList.add("answer-wrapper__answer-owner");
    answerOwner.textContent = answer.answerOwner;

    answerWrapper.appendChild(answerText);
    answerWrapper.appendChild(answerOwner);
    return answerWrapper;
};

const resetQuestionContainer = () => {
    const questionsContainer = document.getElementById("questions-container");
    while (questionsContainer.firstChild) {
        questionsContainer.removeChild(questionsContainer.firstChild);
    }
};

document.getElementById("submit-question").addEventListener("click", submitQuestion);

document.getElementById("questions-container").addEventListener("click", e => {
	e.preventDefault();
	if (e.target.classList.contains("answers-container__submit-button")) {
		// const _id = e.target.parentNode.parentNode.id;
		changeAnswerForm(e.target);
	} else if (e.target.classList.contains("answers-container__submit-new-answer")) {
		const _id = e.target.parentNode.parentNode.parentNode.id;
		const newAnswerText = e.target.previousSibling.previousSibling.value;
		const newAnswerOwner = e.target.previousSibling.value;
		const newAnswerObject = { answerTitle: newAnswerText, answerOwner: newAnswerOwner };
		addNewAnswer(_id, newAnswerObject);
	}
});

const changeAnswerForm = submitButton => {
	const answersContainer = submitButton.parentNode;
	answersContainer.removeChild(submitButton);
	const newAnswerForm = document.createElement("form");
	const newAnswerText = document.createElement("textarea");
	const newAnswerOwner = document.createElement("select");
	let newOption;
	const namesArray = ["João", "Martha", "Lyndsey", "Tom", "Thomas", "Toni", "Michael", "Kristina", "Oliver"];
	for (let i = 0; i < namesArray.length; i++) {
		newOption = document.createElement("option");
		newOption.textContent = namesArray[i];
		newOption.value = namesArray[i];
		newAnswerOwner.appendChild(newOption);
	}

	const newAnswerSubmit = document.createElement("button");
	newAnswerSubmit.type = "submit";
	newAnswerSubmit.textContent = "Add this answer";
	newAnswerSubmit.classList.add("answers-container__submit-new-answer");
	newAnswerForm.appendChild(newAnswerText);
	newAnswerForm.appendChild(newAnswerOwner);
	newAnswerForm.appendChild(newAnswerSubmit);
	answersContainer.appendChild(newAnswerForm);
};

const displayQuestions = questionsArray => {
	resetQuestionContainer();
	const questionsContainer = document.getElementById("questions-container");
	questionsArray.forEach(question => questionsContainer.appendChild(renderQuestion(question)));
};

const renderQuestion = question => {
	const questionWrapper = document.createElement("div");
	questionWrapper.classList.add("question-wrapper__question-wrapper");
	questionWrapper.id = question._id;

	const questionTitle = document.createElement("p");
	questionTitle.classList.add("question-wrapper__question-title");
	questionTitle.textContent = question.question;

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
	question.answers.forEach(answer => answersContainer.appendChild(renderAnswer(answer)));
	const newAnswerButton = document.createElement("button");
	newAnswerButton.type = "submit";
	newAnswerButton.classList.add("answers-container__submit-button");
	//ADD LABEL FOR ACCESSIBILITY
	//const answerLabel = document.createElement("label");
	newAnswerButton.textContent = "Add an answer";
	answersContainer.appendChild(newAnswerButton);

	questionWrapper.appendChild(questionTitle);
	questionWrapper.appendChild(questionDetailContainer);
	questionWrapper.appendChild(answersContainer);

	return questionWrapper;
};

const renderAnswer = answer => {
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

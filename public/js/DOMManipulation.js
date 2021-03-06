document
	.getElementById("submit-question")
	.addEventListener("click", submitQuestion);
document
	.getElementById("questions-container")
	.addEventListener("click", (e) => {
		e.preventDefault();
		if (e.target.classList.contains("answers-container__submit-button")) {
			// const _id = e.target.parentNode.parentNode.id;
			addNewAnswerForm(e.target);
		} else if (
			e.target.classList.contains("answers-container__submit-new-answer")
		) {
			const _id = e.target.parentNode.parentNode.parentNode.id;
			addNewAnswer(_id);
		}
	});

const displayQuestions = (questionsArray) => {
	resetQuestionContainer();
	const questionsContainer = document.getElementById("questions-container");
	if (questionsArray) {
		questionsArray.reduce((previous, current, index, array) => {
			questionsContainer.appendChild(renderQuestion(current, index));
		}, 0);
	}
};

const addNewAnswerForm = (submitButton) => {
	const answersContainer = submitButton.parentNode;
	const _id = answersContainer.parentNode.id;
	answersContainer.removeChild(submitButton);
	const newAnswerForm = document.createElement("form");
	newAnswerForm.classList.add("form");
	newAnswerForm.id = "answer-form";
	const newAnswerText = document.createElement("textarea");
	newAnswerText.classList.add("form__textarea");
	newAnswerText.classList.add("form__input");
	newAnswerText.id = `text${_id}`;
	const newAnswerTextLabel = document.createElement("label");
	newAnswerTextLabel.textContent = "Enter your answer here:";
	newAnswerTextLabel.setAttribute("for", `text${_id}`);
	newAnswerTextLabel.classList.add("form__label");

	const newAnswerOwner = document.createElement("select");
	newAnswerOwner.classList.add("form__dropdown");
	newAnswerOwner.id = `owner${_id}`;
	let newOption;
	const namesArray = [
		"",
		"João",
		"Martha",
		"Lyndsey",
		"Tom",
		"Thomas",
		"Toni",
		"Michael",
		"Kristina",
		"Oliver"
	];
	namesArray.reduce((previous, current, index) => {
		newOption = document.createElement("option");
		if (index === 0) {
			newOption.textContent = "Select Name";
			newOption.disabled = true;
			newOption.selected = true;
		} else {
			newOption.textContent = current;
		}
		newOption.value = current;
		newAnswerOwner.appendChild(newOption);
	}, 0);

	const newAnswerOwnerLabel = document.createElement("label");
	newAnswerOwnerLabel.textContent = "Who are you?";
	newAnswerOwnerLabel.setAttribute("for", `owner${_id}`);
	newAnswerOwnerLabel.classList.add("form__label");

	const newAnswerSubmit = document.createElement("button");
	newAnswerSubmit.type = "submit";
	newAnswerSubmit.textContent = "Add this answer";
	newAnswerSubmit.classList.add("answers-container__submit-new-answer");
	newAnswerSubmit.classList.add("form__button");
	newAnswerForm.appendChild(newAnswerTextLabel);
	newAnswerForm.appendChild(newAnswerText);
	newAnswerForm.appendChild(newAnswerOwnerLabel);
	newAnswerForm.appendChild(newAnswerOwner);
	newAnswerForm.appendChild(newAnswerSubmit);
	answersContainer.appendChild(newAnswerForm);
	newAnswerTextLabel.focus();
};

const renderQuestion = (question, index) => {
	const questionWrapper = document.createElement("div");
	questionWrapper.classList.add("question-wrapper");
	questionWrapper.id = question._id;
	questionWrapper.setAttribute("tabIndex", index);

	const questionTitle = document.createElement("p");
	questionTitle.classList.add("question-wrapper__question-title");
	questionTitle.textContent = `Q: ${question.question}`;

	const questionDetailContainer = document.createElement("div");
	questionDetailContainer.classList.add(
		"question-wrapper__question-detail-container"
	);

	const questionOwner = document.createElement("p");
	questionOwner.classList.add("question-wrapper__question-owner");
	questionOwner.textContent = `Asked by: ${question.questionOwner}`;
	questionDetailContainer.appendChild(questionOwner);

	const week = document.createElement("p");
	week.textContent = `Week ${question.week}`;
	// questionDetailContainer.appendChild(week);
	week.classList.add("question-wrapper__week");

	const answersContainer = document.createElement("div");
	answersContainer.classList.add("question-wrapper__answers-container");
	question.answers.forEach((answer) =>
		answersContainer.appendChild(renderAnswer(answer))
	);
	const newAnswerButton = document.createElement("button");
	newAnswerButton.type = "submit";
	newAnswerButton.classList.add("answers-container__submit-button");
	newAnswerButton.classList.add("form__button");
	//ADD LABEL FOR ACCESSIBILITY
	//const answerLabel = document.createElement("label");
	newAnswerButton.textContent = "Add an answer";
	answersContainer.appendChild(newAnswerButton);

	questionWrapper.appendChild(week);
	questionWrapper.appendChild(questionTitle);
	questionWrapper.appendChild(questionDetailContainer);
	questionWrapper.appendChild(answersContainer);

	return questionWrapper;
};

const renderAnswer = (answer) => {
	const answerWrapper = document.createElement("div");
	answerWrapper.classList.add("answer-wrapper");

	const answerText = document.createElement("p");
	answerText.classList.add("answer-wrapper__answer-text");
	answerText.textContent = answer.answerTitle;

	const answerOwner = document.createElement("p");
	answerOwner.classList.add("answer-wrapper__answer-owner");
	answerOwner.textContent = `Answered by: ${answer.answerOwner}`;

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

const sortBy = (e) => {
	if (e.target.value === "week") {
		getQuestionsFromServer(e.target.value);
	}
};

document.getElementById("sortby").addEventListener("change", sortBy);

const overlayOn = (text) => {
	const overlay = document.querySelector(".overlay");
	overlay.style.display = "block";
	const creationSuccess = document.createElement("p");
	const creationSuccessMessage = document.createTextNode(text);
	creationSuccess.appendChild(creationSuccessMessage);
	creationSuccess.classList.add("overlay__text");
	overlay.appendChild(creationSuccess);
	setTimeout(() => {
		overlay.style.display = "none";
	}, 1200);
};

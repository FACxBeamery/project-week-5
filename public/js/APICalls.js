const resetErrors = () => {
	const errorBoxes = document.getElementsByClassName("form__error-box");
	if (errorBoxes) {
		while (errorBoxes[0]) {
			errorBoxes[0].classList.remove("form__error-box");
		}
	}

	const errorMessages = document.getElementsByClassName(
		"form__error-message"
	);

	if (errorMessages) {
		while (errorMessages[0]) {
			errorMessages[0].parentNode.removeChild(errorMessages[0]);
		}
	}
};

const createError = (message, input, form) => {
	input.classList.add("form__error-box");
	const errorMessage = document.createElement("p");
	errorMessage.classList.add("form__error-message");
	errorMessage.textContent = message;
	// resetWarnings();
	form.insertBefore(errorMessage, input.nextSibling);
};

const validateInput = (
	inputs,
	questionTitle,
	week,
	questionOwner,
	answerTitle
) => {
	let inputValid = true;

	resetErrors();

	const form = document.getElementById("question-form");
	if (!questionTitle) {
		inputValid = false;
		createError("Question can't be empty!", inputs["question"], form);
	} else if (
		questionTitle.length > 140 ||
		typeof questionTitle !== "string"
	) {
		inputValid = false;
		createError(
			"Question can't be longer than 140 chars!",
			inputs["question"],
			form
		);
	}
	if (
		!questionOwner ||
		questionOwner.length < 2 ||
		questionOwner.length > 20 ||
		typeof questionOwner !== "string"
	) {
		inputValid = false;
		createError(
			"Please tell us who you are!",
			inputs["name-dropdown"],
			form
		);
	}
	if (!week || !Number.isInteger(Number(week)) || week < 0 || week > 12) {
		inputValid = false;
		createError(
			"Please assign a week to this question!",
			inputs["week-dropdown"],
			form
		);
	}
	if (answerTitle.length > 10000) {
		inputValid = false;
		createError(
			"Sorry this answer is too long!",
			inputs["answer-text"],
			form
		);
	}

	return inputValid;
};

const submitQuestion = (e) => {
	e.preventDefault();
	const inputs = document.getElementById("question-form").elements;

	const questionTitleValue = inputs["question-text"].value;
	const weekValue = inputs["week-dropdown"].value;
	const questionOwnerValue = inputs["name-dropdown"].value;
	const answerTitleValue = inputs["answer-text"].value;
	const answerOwnerValue = inputs["name-dropdown"].value;

	const inputValid = validateInput(
		inputs,
		questionTitleValue,
		weekValue,
		questionOwnerValue,
		answerTitleValue
	);

	if (inputValid) {
		inputs["question"].value = "";
		inputs["week-dropdown"].value = "";
		inputs["name-dropdown"].value = "";
		inputs["answer"].value = "";
		inputs["name-dropdown"].value = "";

		const body = {
			questionTitle: questionTitleValue,
			answers: answerTitleValue
				? [
						{
							answerTitle: answerTitleValue,
							answerOwner: answerOwnerValue
						}
				  ]
				: [],
			week: weekValue,
			questionOwner: questionOwnerValue
		};
		fetch("/questions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then((res) => res.json())
			.then((data) => (allQuestions = data))
			.then((allQuestions) => {
				overlayOn("Question submitted successfully ✅");

				displayQuestions(allQuestions.reverse());
			})
			.catch((err) => {
				console.error(err);
				alert(
					`Sorry, it looks like there's been a problem! Please try submitting your answer again. `
				);
			});
	}
};

const getQuestionsFromServer = (method) => {
	fetch(`/questions${method ? "/" + method : ""}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then((res) => res.json())
		.then((data) => (allQuestions = data))
		.then((allQuestions) => {
			if (!method) {
				displayQuestions(allQuestions.reverse());
			} else {
				displayQuestions(allQuestions);
			}
		})
		.catch(console.error);
};

const validateAnswer = (answerTitle, answerOwner) => {
	resetErrors();
	let inputValid = true;
	const form = document.getElementById("answer-form");
	if (!answerTitle.value) {
		inputValid = false;
		createError("Answer can't be empty!", answerTitle, form);
	} else if (answerTitle.value.length > 10000) {
		inputValid = false;
		createError("Sorry, this answer is too long!", answerTitle, form);
	}

	if (!answerOwner.value) {
		inputValid = false;
		createError("Please tell us who you are!", answerOwner, form);
	}

	return inputValid;
};

const addNewAnswer = (_id, newAnswerObj) => {
	const answerTitle = document.getElementById(`text${_id}`);
	const answerOwner = document.getElementById(`owner${_id}`);

	const newAnswerObject = {
		answerTitle: answerTitle.value,
		answerOwner: answerOwner.value
	};
	const inputValid = validateAnswer(answerTitle, answerOwner);
	if (inputValid) {

		fetch("/questions", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ _id, answer: newAnswerObject })

		})
			.then((res) => res.json())
			.then((data) => (allQuestions = data))
			.then((allQuestions) => {
				displayQuestions(allQuestions.reverse());

				document.getElementById(_id).focus();
			})
			.catch((err) => {
				console.error(err);
				alert(
					`This answer hasn't been sent successfully - please try again.`
				);
			});
	}
};

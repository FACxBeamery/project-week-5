const resetErrors = () => {
    const errorBoxes = document.getElementsByClassName("form__error-box");
    if (errorBoxes) {
        while (errorBoxes[0]) {
            errorBoxes[0].classList.remove("form__error-box");
        }
    }

    const errorMessages = document.getElementsByClassName("form__error-message");

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

const validateInput = (inputs, questionTitle, week, questionOwner, answerTitle) => {
    let inputValid = true;

    resetErrors();

    const form = document.getElementById("question-form");
    if (!questionTitle) {
        inputValid = false;
        createError("Question can't be empty!", inputs["question"], form);
    } else if (questionTitle.length > 140 || typeof questionTitle !== "string") {
        inputValid = false;
        createError("Question can't be longer than 140 chars!", inputs["question"], form);
    }
    if (
        !questionOwner ||
        questionOwner.length < 2 ||
        questionOwner.length > 20 ||
        typeof questionOwner !== "string"
    ) {
        inputValid = false;
        createError("Please tell us who you are!", inputs["name-dropdown"], form);
    }
    if (!week || !Number.isInteger(Number(week)) || week < 0 || week > 12) {
        inputValid = false;
        createError("Please assign a week to this question!", inputs["week-dropdown"], form);
    }
    if (answerTitle.length > 10000) {
        inputValid = false;
        createError("Sorry this answer is too long!", inputs["answer-text"], form);
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
                ? [{ answerTitle: answerTitleValue, answerOwner: answerOwnerValue }]
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
                displayQuestions(allQuestions.reverse());
            })
            .catch((err) => {
                console.error(err);
                alert(
                    `Sorry, it looks like there's been a problem! Please try submitting your answer again. The error code is ${err.status}`
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

const addNewAnswer = (_id, newAnswerObj) => {
    console.log("this ran");
    const answerTitleValue = newAnswerObj.answerTitle;
    const answerOwnerValue = newAnswerObj.answerOwner;
    console.log(answerTitleValue);
    if (
        !(
            answerTitleValue &&
            answerTitleValue.length < 10000 &&
            answerOwnerValue &&
            answerOwnerValue.length < 20
        )
    ) {
        console.error("answer is invalid, please ensure that it is less than 10000 characters");
        alert(
            "Your answer is too long! Please try to be more concise in your response, and keep it under 10000 characters!"
        );
    } else {
        fetch("/questions", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id, answer: newAnswerObj })
        })
            .then((res) => res.json())
            .then((data) => (allQuestions = data))
            .then((allQuestions) => {
                displayQuestions(allQuestions.reverse());
            })
            .catch((err) => {
                console.error(err);
                alert(
                    `This answer hasn't been sent successfully - please try again. The error code is ${err.status}`
                );
            });
    }
};

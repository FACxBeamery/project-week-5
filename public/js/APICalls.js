const submitQuestion = (e) => {
    e.preventDefault();
    const inputs = document.getElementById("question-form").elements;

    const questionTitleValue = inputs["question"].value;
    const weekValue = inputs["week-dropdown"].value;
    const questionOwnerValue = inputs["name-dropdown"].value;
    const answerTitleValue = inputs["answer"].value;
    const answerOwnerValue = inputs["name-dropdown"].value;
    inputs["question"].value = "";
    inputs["week-dropdown"].value = "";
    inputs["name-dropdown"].value = "";
    inputs["answer"].value = "";
    inputs["name-dropdown"].value = "";

    if (questionTitleValue.length > 140 || typeof questionTitleValue !== "string") {
        alert(
            "Question title is not valid - please ensure it is between 1 and 140 characters in length, and is submitted as a string."
        );
    } else if (
        questionOwnerValue.length < 2 ||
        questionOwnerValue.length > 20 ||
        typeof questionTitleValue !== "string"
    ) {
        alert(
            "This name is not valid - please ensure it is between 2 and 20 characters in length, and is submitted as a string."
        );
    } else if (!Number.isInteger(Number(weekValue)) || weekValue < 0 || weekValue > 12) {
        alert("Please ensure that the week chosen is a whole number between 0 and 12 (inclusive)");
    } else if (answerTitleValue.length > 10000) {
        alert("This answer is too long! Please keep your answer to under 10000 characters.");
    } else if (!(questionTitleValue && weekValue && questionOwnerValue)) {
        // hard-coding required inputs so request doesn't send
        console.error("Please fill in the title!");
    } else {
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
            }
            displayQuestions(allQuestions);
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

const submitQuestion = (e) => {
    const inputs = document.getElementById("question-form").elements;

    const questionTitle = inputs["question"].value;
    const week = inputs["week-dropdown"].value;
    const questionOwner = inputs["name-dropdown"].value;

    if (questionTitle.length > 140 || typeof questionTitle !== "string") {
        alert(
            "Question title is not valid - please ensure it is between 1 and 140 characters in length, and is submitted as a string."
        );
    } else if (
        questionOwner.length < 2 ||
        questionOwner.length > 20 ||
        typeof questionTitle !== "string"
    ) {
        alert(
            "This name is not valid - please ensure it is between 2 and 20 characters in length, and is submitted as a string."
        );
        return;
    } else if (!Number.isInteger(Number(week)) || week < 0 || week > 12) {
        alert("Please ensure that the week chosen is a whole number between 0 and 12 (inclusive)");
    } else if (!(questionTitle && week && questionOwner)) {
        // hard-coding required inputs so request doesn't send
        console.error("Please fill in the title!");
    } else {
        const body = {
            questionTitle: inputs["question"].value,
            answers: inputs["answer"].value
                ? [
                      {
                          answerTitle: inputs["answer"].value,
                          answerOwner: inputs["name-dropdown"].value
                      }
                  ]
                : [],
            week: inputs["week-dropdown"].value,
            questionOwner: inputs["name-dropdown"].value
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
                console.log(allQuestions);
                displayQuestions(allQuestions);
            })
            .catch((err) => {
                console.error(err);
                alert(
                    "Sorry, it looks like there's been a problem! Please try submitting your answer again."
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
            console.log(allQuestions);
            if (!method) {
                displayQuestions(allQuestions.reverse());
            }
            displayQuestions(allQuestions);
        })
        .catch(console.error);
};

const addNewAnswer = (_id, newAnswerObj) => {
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
            console.log(allQuestions);
            displayQuestions(allQuestions);
        })
        .catch(console.error);
};

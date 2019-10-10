const submitQuestion = (e) => {
    e.preventDefault();
    const inputs = document.getElementById("question-form").elements;
    const body = {
        questionTitle: inputs["question"].value,
        answers: inputs["answer"].value
            ? [{ answerTitle: inputs["answer"].value, answerOwner: inputs["name-dropdown"].value }]
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
        .catch(console.error);
};

const getQuestionsFromServer = () => {
    fetch("/questions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => (allQuestions = data))
        .then((allQuestions) => {
            console.log(allQuestions);
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

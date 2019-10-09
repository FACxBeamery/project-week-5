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
        .then(displayQuestions)
        .catch(console.error);
};

const getQuestionsFromServer = () => {
    fetch("/questions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            console.log(res.json());
            return res.json();
        })
        .then((data) => {
            console.log(data);
            displayQuestions(data);
        })
        .catch(console.error);
};

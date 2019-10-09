const questions = [
    {
        _id: "1",
        question: "question 1",
        answers: [
            { answerTitle: "answer title 1 for q1", answerOwner: "answer owner 1 for q1" },
            { answerTitle: "answer title 2 for q1", answerOwner: "answer owner 2 for q1" },
            { answerTitle: "answer title 3 for q1", answerOwner: "answer owner 3 for q1" }
        ],
        questionOwner: "owner for question 1",
        week: "1",
        dateAdded: "Wed, 14 Jun 2017 07:00:00 GMT",
        dateEdited: "Wed, 14 Jun 2017 07:00:00 GMT"
    },
    {
        _id: "2",
        question: "question 2",
        answers: [
            { answerTitle: "answer title 1 for q2", answerOwner: "answer owner 1 for q2" },
            { answerTitle: "answer title 2 for q2", answerOwner: "answer owner 2 for q2" },
            { answerTitle: "answer title 3 for q2", answerOwner: "answer owner 3 for q2" }
        ],
        questionOwner: "owner for question 2",
        week: "1",
        dateAdded: "Wed, 9 Oct 2019 07:00:00 GMT",
        dateEdited: "Wed, 9 Oct 2019 07:00:00 GMT"
    },
    {
        _id: "3",
        question: "question 3",
        answers: [],
        questionOwner: "owner for question 3",
        week: "2",
        dateAdded: "Wed, 9 Oct 2019 07:00:00 GMT",
        dateEdited: "Wed, 9 Oct 2019 07:00:00 GMT"
    }
];

module.exports = { questions };

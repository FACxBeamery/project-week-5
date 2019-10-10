const ObjectId = require("mongodb").ObjectId;

const questions = [
    {
        _id: ObjectId(1),
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
        _id: ObjectId("507f1f77bcf86cd799439011"),
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
        _id: ObjectId(3),
        question: "question 3",
        answers: [],
        questionOwner: "owner for question 3",
        week: "12",
        dateAdded: "Wed, 9 Oct 2019 07:00:00 GMT",
        dateEdited: "Wed, 9 Oct 2019 07:00:00 GMT"
    }
];

const newQuestion = {
    _id: ObjectId(4),
    question: "question 4",
    answers: [],
    questionOwner: "owner for question 4",
    week: "10",
    dateAdded: "Thu, 10 Oct 2019 07:00:00 GMT",
    dateEdited: "Thu, 10 Oct 2019 07:00:00 GMT"
};

module.exports = { questions, newQuestion };

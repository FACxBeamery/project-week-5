const createQuestion = (newQuestion, questions, cb) => {
    questions.insertOne(newQuestion, cb);
};

module.exports = createQuestion;

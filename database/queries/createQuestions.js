const createQuestion = (newQuestion, questions) => {
    questions.insertOne(newQuestion, (err, result) => {
        if (err) throw err;
        return result;
    });
};

module.exports = createQuestion;

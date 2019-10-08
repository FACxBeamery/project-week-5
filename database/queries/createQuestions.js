const createQuestion = (newTodo, questions) => {
    questions.insertOne(newTodo, (err, result) => {
        if (err) throw err;
        return result;
    });
};

module.exports = createQuestion;

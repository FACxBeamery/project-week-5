const readQuestions = (questions, cb) => {
    questions.find({}).toArray(cb);
};

module.exports = readQuestions;

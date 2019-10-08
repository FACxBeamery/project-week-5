const readQuestions = (questions) => {
    questions.find({}).toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        return result;
    });
};

module.exports = readQuestions;

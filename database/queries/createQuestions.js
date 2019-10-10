const createQuestion = (newQuestion, questions) => {
    return new Promise((resolve, reject) => {
        questions.insertOne(newQuestion, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = createQuestion;

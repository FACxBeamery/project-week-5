const readQuestions = (questions) => {
    return new Promise((resolve, reject) => {
        questions.find({}).toArray((err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = readQuestions;

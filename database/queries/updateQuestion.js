const updateQuestion = (newAnswer, idToUpdate, questions) => {
    return new Promise((resolve, reject) => {
        questions.update({ _id: idToUpdate }, { $push: { answers: newAnswer } }, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = updateQuestion;

const sortQuestionsBy = (questions, sortKey, sortValue) => {
    const sortObject = {
        [sortKey]: sortValue
    };

    return new Promise((resolve, reject) => {
        questions
            .find()
            .sort(sortObject)
            .toArray((err, result) => {
                if (err) reject(err);
                resolve(result);
            });
    });
};

module.exports = sortQuestionsBy;

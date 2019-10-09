const sortQuestionsBy = (questions, sortKey, sortValue) => {
    const sortObject = {
        [sortKey]: sortValue
    };

    questions
        .find()
        .sort(sortObject)
        .toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            return result;
        });
};

module.exports = sortQuestionsBy;

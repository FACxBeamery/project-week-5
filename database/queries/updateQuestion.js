const ObjectId = require("mongodb").ObjectId;
const updateQuestion = (newAnswer, idToUpdate, questions) => {
	return new Promise((resolve, reject) => {
		questions.updateOne(
			{ _id: ObjectId(idToUpdate) },
			{ $push: { answers: newAnswer } },
			(err, result) => {
				if (err) reject(err);
				resolve(result);
			}
		);
	});
};

module.exports = updateQuestion;

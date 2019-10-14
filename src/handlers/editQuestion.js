const updateQuestion = require("../../database/queries/updateQuestion");
const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const Joi = require("joi");

const editQuestion = (req, res) => {
	//ADD NEW SCHEMA??

	// const newAnswerSchema = Joi.object().keys({
	//     answers: Joi.required()
	// })

	const newAnswer = req.fields.answer;
	const idToUpdate = req.fields._id;
	const db = getDB();
	updateQuestion(newAnswer, idToUpdate, db.collection("questions"))
		.then((result) => readQuestions(db.collection("questions")))
		.then((result) => res.status(200).json(result))
		.catch((err) => res.status(404).json(err.message));
};

module.exports = editQuestion;

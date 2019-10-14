const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const sortQuestions = require("../../database/queries/sortQuestions");

const getQuestions = (req, res) => {
	const db = getDB();

	if (["week"].includes(req.params.sortby)) {
		sortQuestions(db.collection("questions"), req.params.sortby, -1)
			.then((result) => res.status(200).json(result))
			.catch((err) => res.status(404).json(err.message));
	} else {
		readQuestions(db.collection("questions"))
			.then((result) => res.status(200).json(result))
			.catch((err) => res.status(404).json(err.message));
	}
};

module.exports = getQuestions;

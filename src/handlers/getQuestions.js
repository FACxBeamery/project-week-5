const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const sortQuestions = require("../../database/queries/sortQuestions");

const getQuestions = (req, res) => {
    const db = getDB();

    if (["week"].includes(req.query.sortBy)) {
        res.json(sortQuestions(db.collection("questions"), req.query.sortBy, -1));
    } else {
        readQuestions(db.collection("questions"))
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(404).json(err.message));
    }
};

module.exports = getQuestions;

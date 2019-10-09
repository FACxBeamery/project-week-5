const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const sortQuestions = require("../../database/queries/sortQuestions");

const getQuestions = (req, res) => {
    const db = getDB();

    if (["week"].includes(req.query.sortBy)) {
        res.send(sortQuestions(db.collection("questions"), req.query.sortBy, -1));
    } else {
        res.send(readQuestions(db.collection("questions")));
    }
};

module.exports = getQuestions;

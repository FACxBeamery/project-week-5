const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;

const getQuestions = (req, res) => {
    // const sortBy = req.query.sortBy;
    // res.send(dbConnection(readQuestions));
    const db = getDB();
    res.send(readQuestions(db.collection("questions")));
};

module.exports = getQuestions;

const dbConnection = require("../../database/dbConnection.js");
const readQuestions = require("../../database/queries/readQuestions");

const getQuestions = (req, res) => {
    const sortBy = req.query.sortBy;
    res.send(dbConnection(readQuestions));
};

module.exports = getQuestions;

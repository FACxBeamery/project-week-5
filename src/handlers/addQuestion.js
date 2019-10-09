const logic = require("../logic.js");
const dbConnection = require("../../database/dbConnection");
const createQuestion = require("../../database/queries/createQuestions");
const getDB = require("../../database/dbConnection.js").getDb;

const addQuestion = (req, res) => {
    /**
     * _id auto generated
     * required question req.fields.questionTitle
     *  answer req.fields.answers []
     * required owner req.fields.owner
     * source req.fields.source
     * required week req.fields.week
     * dateAdded -> date.now
     * dateEdited -> date.edited
     */

    // asnwers should look like: [{answer: stringanswer, source: stringsource, answerOwner: stringowner}]

    const newQuestion = {
        question: req.fields.questionTitle,
        answers: req.fields.answers,
        questionOwner: req.fields.questionOwner,
        week: req.fields.week,
        dateAdded: new Date(Date.now()).toUTCString(),
        dateEdited: new Date(Date.now()).toUTCString()
    };

    const db = getDB();
    createQuestion(newQuestion, db.collection("questions"));
    res.status(200).send("<h1>Item successfully added</h1>");
};

module.exports = addQuestion;

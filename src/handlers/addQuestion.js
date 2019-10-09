const logic = require("../logic.js");
const dbConnection = require("../../database/dbConnection");
const createQuestion = require("../../database/queries/createQuestions");
const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const Joi = require("joi");

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

    // asnwers should look like: [{answer: stringanswer, answerOwner: stringowner}]

    const newQuestionSchema = Joi.object().keys({
        question: Joi.string()
            .min(1)
            .max(140)
            .required(),
        questionOwner: Joi.string()
            .min(1)
            .max(20)
            .required(),
        week: Joi.number()
            .integer()
            .min(0)
            .max(12)
            .required(),
        answers: Joi.required(),
        dateAdded: Joi.string(),
        dateEdited: Joi.string()
    });

    const newQuestion = {
        question: req.fields.questionTitle,
        answers: req.fields.answers,
        questionOwner: req.fields.questionOwner,
        week: req.fields.week,
        dateAdded: new Date(Date.now()).toUTCString(),
        dateEdited: new Date(Date.now()).toUTCString()
    };

    newQuestionSchema
        .validate(newQuestion, { abortEarly: false }) //abortEarly - collect all errors not just the first one
        .then((validatedQuestion) => {
            const db = getDB();
            createQuestion(newQuestion, db.collection("questions"), (err, result) => {
                if (err) throw err;
                readQuestions(db.collection("questions"), (err) => {
                    if (err) throw err;
                    res.status(200).json(result);
                });
            });
        })
        .catch((validationError) => {
            const errorMessage = validationError.details.map((d) => d.message);
            res.status(400).send(errorMessage);
        });
};

module.exports = addQuestion;

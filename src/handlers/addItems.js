const logic = require("../logic.js");
const dbConnection = require("../../database/dbConnection");
const createQuestion = require("../../database/queries/createQuestions");

const addQuestions = (req, res) => {
    // const dateNow = Date.now();
    // const newItem = logic.createItem(req.fields, dateNow);
    // // dbConnection((questions) => createTodo(newItem, questions));
    // res.redirect(302, "/");
};

module.exports = addQuestions;

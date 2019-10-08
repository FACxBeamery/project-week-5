const logic = require("../logic.js");
const dbConnection = require("../../database/dbConnection");
const createQuestion = require("../../database/queries/createQuestions");
const getDB = require("../../database/dbConnection.js").getDb;

const addQuestion = (req, res) => {
    // const dateNow = Date.now();
    // const newItem = logic.createItem(req.fields, dateNow);
    // // dbConnection((questions) => createTodo(newItem, questions));
    // res.redirect(302, "/");

    const db = getDB();
    console.log(db);
    createQuestion({ dummy: "variable" }, db.collection("questions"));
    res.status(200).send("<h1>Item successfully added</h1>");
};

module.exports = addQuestion;

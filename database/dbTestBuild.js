const { questions } = require("./dummyData");

const deleteAllQuestions = (db) => db.collection("questions").deleteMany({});

const buildTestQuestions = (db) => db.collection("questions").insertMany(questions);

module.exports = { deleteAllQuestions, buildTestQuestions };

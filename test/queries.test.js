const test = require("tape");
const { initDb, getDb, closeDb } = require("../database/dbConnection");
const { deleteAllQuestions, buildTestQuestions } = require("../database/dbTestBuild");
const readQuestions = require("../database/queries/readQuestions");

test("database setup", (t) => {
    initDb().then((db) => {
        deleteAllQuestions(db)
            .then(buildTestQuestions(db))
            .then(closeDb)
            .then(() => t.end());
    });
});

test("async test 1", (t) => {
    // state how many test assertions will be made
    t.plan(1);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            //put tests here, using db returned from initDb promise

            readQuestions(db.collection("questions"), (err, questions) => {
                t.equal(questions.length, 3, "questions array has length 3");
            });
        })
        .then(closeDb);
});

const test = require("tape");
const { initDb, getDb, closeDb } = require("../database/dbConnection");
const { deleteAllQuestions, buildTestQuestions } = require("../database/dbTestBuild");
const readQuestions = require("../database/queries/readQuestions");
const createQuestion = require("../database/queries/createQuestions");
const sortQuestionsBy = require("../database/queries/sortQuestions");
const { newQuestion } = require("../database/dummyData");

test("database setup", (t) => {
    initDb().then((db) => {
        deleteAllQuestions(db)
            .then(buildTestQuestions(db))
            .then(closeDb)
            .then(() => t.end());
    });
});

test("Testing how many entries the collection has", (t) => {
    // state how many test assertions will be made
    t.plan(1);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            //put tests here, using db returned from initDb promise
            readQuestions(db.collection("questions"))
                .then((questions) => t.equal(questions.length, 3, "questions array has length 3"))
                .catch((err) => console.log(err));
        })
        .then(closeDb);
});

test("Testing the content of the questions' titles", (t) => {
    // state how many assertions will be made
    t.plan(3);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            //put tests here, using db returned from initDb promise
            readQuestions(db.collection("questions"))
                .then((questions) => {
                    t.equal(
                        questions[0].question,
                        "question 1",
                        "first question is named 'question 1'"
                    );
                    t.equal(
                        questions[1].question,
                        "question 2",
                        "first question is named 'question 2'"
                    );
                    t.equal(
                        questions[2].question,
                        "question 3",
                        "first question is named 'question 3'"
                    );
                })
                .catch((err) => console.log(err));
        })
        .then(closeDb);
});

test("Testing if answers prop in questions is an array", (t) => {
    // state how many assertions will be made
    t.plan(3);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            //put tests here, using db returned from initDb promise
            readQuestions(db.collection("questions"))
                .then((questions) => {
                    t.ok(
                        Array.isArray(questions[0].answers),
                        `question ${questions[0]._id}'s answers is an array`
                    );
                    t.ok(
                        Array.isArray(questions[1].answers),
                        `question ${questions[1]._id}'s answers is an array`
                    );

                    t.ok(
                        Array.isArray(questions[2].answers),
                        `question ${questions[2]._id}'s answers is an array`
                    );
                })
                .catch((err) => console.log(err));
        })
        .then(closeDb);
});

test("Testing if questions are added properly ", (t) => {
    // state how many assertions will be made
    t.plan(3);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            //put tests here, using db returned from initDb promise
            createQuestion(newQuestion, db.collection("questions"))
                .then((result) => {
                    t.equal(result.ops[0]._id, newQuestion._id, "new id should be '4'");
                    t.equal(
                        result.ops[0].question,
                        newQuestion.question,
                        "question title should be added correctly"
                    );
                    t.equal(
                        result.ops[0].dateAdded,
                        newQuestion.dateAdded,
                        "dateAdded should be added correctly"
                    );
                })
                .catch(console.log);
        })
        .then(closeDb);
});

test("Testing if dates are actual UTC string dates", (t) => {
    // state how many assertions will be made
    t.plan(3);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            readQuestions(db.collection("questions"))
                .then((questions) => {
                    t.ok(
                        Date.parse(questions[0].dateAdded),
                        `question ${questions[0]._id}'s dateAdded is of type date `
                    );
                    t.ok(
                        Date.parse(questions[1].dateAdded),
                        `question ${questions[1]._id}'s dateAdded is of type date `
                    );

                    t.ok(
                        Date.parse(questions[2].dateAdded),
                        `question ${questions[2]._id}'s dateAdded is of type date `
                    );
                })
                .catch((err) => console.log(err));
        })
        .then(closeDb);
});

test("Testing if week prop in questions obj is a string that represents a number from 0-12", (t) => {
    // state how many assertions will be made
    t.plan(3);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            readQuestions(db.collection("questions"))
                .then((questions) => {
                    const isNumberFrom0To12 = /^([1-9]|[0-1][0-2])$/;
                    t.ok(
                        questions[0].week.match(isNumberFrom0To12),
                        `question ${questions[0]._id}'s week is of type string representing a number from 0-12 `
                    );
                    t.ok(
                        questions[1].week.match(isNumberFrom0To12),
                        `question ${questions[1]._id}'s week is of type string representing a number from 0-12 `
                    );

                    t.ok(
                        questions[2].week.match(isNumberFrom0To12),
                        `question ${questions[2]._id}'s week is of type string representing a number from 0-12 `
                    );
                })
                .catch((err) => console.log(err));
        })
        .then(closeDb);
});

test("Testing if collections are sorted by week in descending order", (t) => {
    // state how many assertions will be made
    t.plan(1);
    // open new db connection for these tests
    initDb()
        .then((db) => {
            sortQuestionsBy(db.collection("questions"), "week", -1)
                .then((questions) => {
                    t.ok(
                        questions[0].week > questions[1].week,
                        `first question's week is 'higher' than the second question's week `
                    );
                })
                .catch(console.log);
        })
        .then(closeDb);
});

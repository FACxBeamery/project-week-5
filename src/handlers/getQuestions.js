const readQuestions = require("../../database/queries/readQuestions");
const getDB = require("../../database/dbConnection.js").getDb;
const sortQuestions = require("../../database/queries/sortQuestions");

const getQuestions = (req, res) => {
    const db = getDB();

    if (["week"].includes(req.query.sortBy)) {
        res.json(sortQuestions(db.collection("questions"), req.query.sortBy, -1));
    } else {
        // res.json(readQuestions(db.collection("questions")));
        // readQuestions(db.collection("questions"), (err, result) => {
        //     if (err) throw err;
        //     console.log(result);
        //     res.status(200).json(result);
        // });

        readQuestions(db.collection("questions"))
            .then((result) => res.status(200).json(result))
            .catch((err) => res.status(404).json(err.message));
    }
};

module.exports = getQuestions;

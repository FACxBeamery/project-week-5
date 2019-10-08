const mongo = require("mongodb").MongoClient;

const dbConnection = (cb) => {
    mongo.connect(
        "mongodb://localhost:27017/trainingforum",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },

        function(err, client) {
            if (err) throw err;

            const db = client.db("trainingforum");
            const questions = db.collection("questions");
            cb(questions);
        }
    );
};

module.exports = dbConnection;

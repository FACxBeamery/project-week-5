const express = require("express");
const addQuestion = require("./handlers/addQuestion.js");
const getQuestions = require("./handlers/getQuestions.js");
const editQuestion = require("./handlers/editQuestion.js");

const router = express();

router.use(express.static("public"));

router.get("/questions/", getQuestions);

router.get("/questions/:sortby", getQuestions);

router.post("/questions", addQuestion);

router.patch("/questions", editQuestion);

module.exports = router;

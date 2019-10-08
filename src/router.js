const express = require("express");
const addQuestion = require("./handlers/addQuestion.js");
const getQuestions = require("./handlers/getQuestions.js");
// const editItem = require("./handlers/editItem.js");
// const deleteItem = require("./handlers/deleteItem.js");

const router = express();

router.use(express.static("public"));

router.get("/questions", getQuestions);

router.post("/questions", addQuestion);

// router.delete("/items/:id(\\d+)", deleteItem);

// router.patch("/items/:id(\\d+)", editItem);

module.exports = router;

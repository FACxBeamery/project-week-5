const express = require("express");
// const addItems = require("./handlers/addItems.js");
// const getItems = require("./handlers/getItems.js");
// const editItem = require("./handlers/editItem.js");
// const deleteItem = require("./handlers/deleteItem.js");

const router = express();

router.use(express.static("public"));

router.get("/questions", getQuestions);

// router.post("/items", addItems);

// router.delete("/items/:id(\\d+)", deleteItem);

// router.patch("/items/:id(\\d+)", editItem);

module.exports = router;

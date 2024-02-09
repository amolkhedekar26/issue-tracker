const express = require("express");
const IssueController = require("../controller/issue.controller");
const router = express.Router();

router.get("/", IssueController.all);

router.get("/:id", IssueController.one);

router.post("/", IssueController.create);

router.put("/:id", IssueController.update);

router.delete("/:id", IssueController.delete)

module.exports = router;

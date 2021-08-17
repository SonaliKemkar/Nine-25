const express = require("express");
const router = express.Router();

const LogController = require("../controllers/log.controller");

router.post("/getNextDay", LogController.getNextDay);

module.exports=router;
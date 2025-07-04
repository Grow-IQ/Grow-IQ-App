const express = require("express");
const router = express.Router();
const checkProviderController = require("./checkProviderController");

router.get("/getProvider", checkProviderController.getProvider);

module.exports = router;
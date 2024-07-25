const express = require("express");
const s3Controller = require("../controller/s3-controller");

const router = express.Router();
router.get("/:uid", s3Controller.getPictures);
router.patch("/upload/:uid", s3Controller.uploadPictures);
module.exports = router;

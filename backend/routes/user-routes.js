const express = require("express");
const usersController = require("../controller/users-controller");

const router = express.Router();
router.get("/user/:uid", usersController.getUser);
router.get("/user/recommendation/:uid", usersController.getRecommendation);

router.post("/user/create/:uid", usersController.createUser);

router.patch("/user/update/:uid", usersController.updateUser);
router.patch("/user/swipe/:uid", usersController.swipeUser);
router.patch("/user/reject/:uid", usersController.rejectUser);

module.exports = router;

const express = require('express')
const usersController = require("../controller/users-controller")

const router = express.Router()
const { check } = require("express-validator")


router.get('/user/:uid', usersController.getUser)

module.exports = router
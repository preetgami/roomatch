const { validationResult } = require("express-validator")
// const Httperror = require("../models/http-error")
// const User = require("../models/user")

const getUser = async (req, res, next) => {
    const userId = req.params.uid;
    res.json({ 'name': userId })
}

exports.getUser = getUser
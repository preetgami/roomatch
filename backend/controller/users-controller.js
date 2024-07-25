const Httperror = require("../models/http-error");
const User = require("../models/user");

const getUser = async (req, res, next) => {
  const uid = req.params.uid;
  let user;
  try {
    user = await User.find({ uid });
  } catch (err) {
    const error = new Httperror("signup failed try later", 500);
    return next(err);
  }

  res.json({ user });
};

const createUser = async (req, res, next) => {
  const { name, uid, age, location, career, hobby } = req.body;
  const createUser = new User({
    name,
    uid,
    age,
    location,
    career,
    hobby,
  });
  try {
    let user = await User.findOne({ uid });
    if (user) {
      const error = new Httperror("failed creating user, already created", 500);
      return next(error);
    }
    await createUser.save();
  } catch (err) {
    const error = new Httperror("failed creating user", err, 500);
    return next(error);
  }
  res.status(201).json({
    message: "success creating user",
  });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { name, age, location, career, hobby } = req.body;
  const filter = { uid: userId };
  const update = {};

  if (name) {
    update.name = name;
  }
  if (age) {
    update.age = age;
  }
  if (location) {
    update.location = location;
  }
  if (career) {
    update.career = career;
  }
  if (hobby) {
    update.hobby = hobby;
  }
  try {
    await User.findOneAndUpdate(filter, update);
  } catch (err) {
    const error = new Httperror("failed creating user", 500);
    return next(error);
  }
  res.status(201).json({
    message: "success updating user",
  });
};

const swipeUser = async (req, res, next) => {
  const uid = req.params.uid;
  const { like } = req.body;
  let user;
  let userLiked;
  let likedUserId;
  try {
    user = await User.findOne({ uid });
    userLiked = await User.findOne({ uid: like });
    likedUserId = userLiked._id;
    if (like === uid) {
      const error = new Httperror("swipe failed, cant like your self", 400);
      return next(error);
    }
    if (!user.likes.has(like)) {
      user.likes.set(like, likedUserId);
      await user.save();
      if (userLiked.likes.has(user.uid)) {
        user.matches.set(like, likedUserId);
        userLiked.set(uid, user._id);
        await user.save();
      }
    } else {
      const error = new Httperror("already liked this user", 400);
      return next(error);
    }
  } catch (err) {
    const error = new Httperror("swipe failed", 500);
    return next(error);
  }
  res.json({ message: "Success liking user" });
};

const getRecommendation = async (req, res, next) => {
  const uid = req.params.uid;
  try {
    const currentUser = await User.findOne({ uid });
    if (!currentUser) {
      const error = new Httperror("User not found", 404);
      return next(error);
    }
    const recommendations = await User.find({
      uid: { $ne: currentUser.uid },
      location: { $regex: new RegExp(currentUser.location, "i") },
      age: { $gte: currentUser.age - 5, $lte: currentUser.age + 5 },
    });
    const filteredRecommendations = recommendations.filter((user) => {
      return (
        !currentUser.likes.has(user.uid) && !currentUser.rejects.has(user.uid)
      );
    });
    res.json({ recommendations: filteredRecommendations });
  } catch (err) {
    const error = new Httperror("Failed to get recommendations", 500);
    return next(error);
  }
};

const rejectUser = async (req, res, next) => {
  const uid = req.params.uid;
  const { reject } = req.body;

  let user;
  let userReject;
  let rejectedUserId;
  try {
    user = await User.findOne({ uid });
    userReject = await User.findOne({ uid: reject });
    rejectedUserId = userReject._id;

    if (reject === uid) {
      const error = new Httperror("reject failed, cant reject yourself", 400);
      return next(error);
    }
    if (!user.rejects.has(reject)) {
      user.rejects.set(reject, rejectedUserId);
      await user.save();
    } else {
      const error = new Httperror("already rejected this user", 400);
      return next(error);
    }
  } catch (err) {
    const error = new Httperror("reject failed", 500);
    return next(error);
  }
  res.json({ message: "Success rejecting user" });
};

exports.getUser = getUser;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.swipeUser = swipeUser;
exports.getRecommendation = getRecommendation;
exports.rejectUser = rejectUser;

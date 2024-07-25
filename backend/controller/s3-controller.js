const aws = require("aws-sdk");
const User = require("../models/user");
const Httperror = require("../models/http-error");

const region = "us-east-2";
const bucketName = "roomatchawss3";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const crypto = require("crypto");
const util = require("util");
const user = require("../models/user");
const randomBytes = util.promisify(crypto.randomBytes);

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const getPictures = async (req, res, next) => {
  const uid = req.params.uid;
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 3600,
    ContentType: "image/jpeg",
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  res.json({ url: uploadURL });
};

const uploadPictures = async (req, res, next) => {
  const uid = req.params.uid;
  const { url } = req.body;
  try {
    let user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.pictures.push(url);

    await user.save();
    res.json({ message: "Success uploading" });
  } catch (e) {
    console.error("Error uploading:", e);
    const error = new HttpError("Upload failed", e, 400);
    return next(error);
  }
};
exports.getPictures = getPictures;
exports.uploadPictures = uploadPictures;

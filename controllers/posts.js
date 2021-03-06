const { Post, postFields } = require("../models/post");
const User = require("../models/user");
const {
  paginationParams,
  sortParams,
  sortParamToString,
  filterOption,
} = require("../utils");
const { sendEmail } = require("../utils/mail");
require("express-async-errors");
const moment = require("moment");

exports.all = async (req, res, next) => {
  // TODO: refactor
  const { limit, page, skip } = paginationParams(req.query);
  const { sortBy, direction } = sortParams(req.query, postFields);

  const docs = Post.find(filterOption(req.query))
    .sort(sortParamToString(sortBy, direction))
    .skip(skip)
    .limit(limit)
    .populate("user", { username: 1, email: 1, number: 1 });

  const allData = Post.countDocuments();
  const response = await Promise.all([docs.exec(), allData.exec()]);
  const [data, total] = response;
  const pages = Math.ceil(total / limit);
  res.json({ data, meta: { limit, skip, total, page, pages } });
};

exports.create = async (req, res, next) => {
  const { body = {}, decodedUser = {} } = req;
  const user = await User.findById(decodedUser.id);
  const post = new Post({ ...body, user: user._id });
  const data = await post.save();
  user.posts = user.posts.concat(data.id);
  await user.save();
  res.status(201).json({ data });
};

exports.read = async (req, res, next) => {
  const { params = {} } = req;
  const data = await Post.findById(params.id);
  res.json({ data });
};

exports.delete = async (req, res, next) => {
  const { params = {} } = req;
  const data = await Post.findByIdAndRemove(params.id);
  res.json({ data });
};

exports.update = async (req, res, next) => {
  const { params = {}, body = {} } = req;
  const post = body;

  const data = await Post.findByIdAndUpdate(params.id, post, {
    runValidators: true,
    new: true,
  });
  res.json({ data });
};

exports.sendEmail = async (req, res, next) => {
  const { body = {} } = req;
  sendEmail(body.name, body.mail, body.subject, body.body, body.emailcompany);
  res.json({ data: true });
};

exports.paymentPost = async (req, res, next) => {
  const id = req.params.id;
  const dataBD = await Post.findById(id);
  dataBD.published = 1;
  dataBD.atPublished = moment();
  const ahora = moment();
  dataBD.atCaduce = ahora.add(7, "d");
  const data = await Post.findByIdAndUpdate(id, dataBD, {
    runValidators: true,
    new: true,
  });

  res.json({ data: true });
};

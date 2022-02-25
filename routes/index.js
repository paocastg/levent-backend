const router = require("express").Router();
const posts = require("./posts");
const users = require("./users");
const test = require("./testing");
const payment = require("./payment");

router.use("/payment", payment);
router.use("/posts", posts);
router.use("/users", users);
router.use("/", test);

module.exports = router;

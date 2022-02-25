const router = require("express").Router();
const controller = require("../controllers/payments");

router.route("/create-checkout-session/:id").post(controller.checkPayment);

module.exports = router;

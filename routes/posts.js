const router = require("express").Router();
const controller = require("../controllers/posts");
const { authToken } = require("../middleware");

router.route("/").get(controller.all).post(authToken, controller.create);
router.route("/sendemail").post(controller.sendEmail);
router
  .route("/:id")
  .get(controller.read)
  .put(authToken, controller.update)
  .delete(authToken, controller.delete);

module.exports = router;

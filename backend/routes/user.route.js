const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  userLogin,
} = require("../controllers/user.controller");

const validateMiddleware = require("../middlewares/validate.middleware");
const {
  validateUserSchema,
  loginUserSchema,
} = require("../validations/user.validation");

const userValidator = validateMiddleware(validateUserSchema);
const loginValidator = validateMiddleware(loginUserSchema);

router.post("/createUser", userValidator, createUser);
router.post("/loginUser", loginValidator, userLogin);
router.get("/allUsers", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;

const express = require("express");
const passport = require("passport");
const studentRoutes = express.Router();
require("../middleware/security/auth");

const registerController = require("../controllers/register");
const loginController = require("../controllers/login");
const searchController = require("../controllers/search");
const removeController = require("../controllers/remove");
const updateController = require("../controllers/update");

const auth = require("../middleware/security/auth");
const reglogValidation = require("../middleware/validation/reglogValidation");
const crudValidation = require("../middleware/validation/crudValidation");

studentRoutes.use(passport.initialize());
studentRoutes.use("/register", reglogValidation);
studentRoutes.use("/login", reglogValidation);
studentRoutes.use("/crud", crudValidation);
studentRoutes.use("/login", passport.authenticate("jwt", { session: false }));
studentRoutes.use("/crud", passport.authenticate("jwt", { session: false }));

studentRoutes.route("/login").post(loginController);
studentRoutes.route("/register").post(registerController);
studentRoutes
  .route("/crud")
  .get(searchController)
  .delete(removeController)
  .patch(updateController);

module.exports = studentRoutes;

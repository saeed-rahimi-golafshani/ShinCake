const { AuthenticationController } = require("../../Http/Controllers/User/Auth.Controller");
const router = require("express").Router();

router.post("/login", AuthenticationController.loginWithOtp);
router.post("/check_login", AuthenticationController.checkLogin);

module.exports = {
    userApiAuthenticationRoutes: router
}
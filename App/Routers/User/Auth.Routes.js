const { AuthenticationController } = require("../../Http/Controllers/User/Auth.Controller");
const router = require("express").Router();

router.post("/login", AuthenticationController.loginWithOtp);
router.post("/check_login", AuthenticationController.checkLogin);
router.post("/refresh_token", AuthenticationController.getRefreshToken) 

module.exports = {
    userApiAuthenticationRoutes: router
}
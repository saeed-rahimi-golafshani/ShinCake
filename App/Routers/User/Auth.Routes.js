const { AuthenticationController } = require("../../Http/Controllers/User/Auth.Controller");

const router = require("express").Router();

router.post("/login", AuthenticationController.loginWithOtp)

module.exports = {
    userApiAuthenticationRoutes: router
}
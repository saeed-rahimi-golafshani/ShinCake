const { HomeController } = require("../Http/Controllers/Api/Home.Controller");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const router = require("express").Router();

router.use("/user", userApiAuthenticationRoutes);
router.use("/", HomeController.indexPage);

module.exports = {
    AllRoutes: router
}
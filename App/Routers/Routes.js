const { HomeController } = require("../Http/Controllers/Api/Home.Controller");
const { verifyAccessToken } = require("../Http/Middelwares/VerifyAccessToken");
const redisClient = require("../Uttils/Init.Redis");
const { AdminApiRoutes } = require("./Admin/AdminRoutes");
const { userApiAuthenticationRoutes } = require("./User/Auth.Routes");
const router = require("express").Router();
(async () =>{
    await redisClient.set("key", "value");
    const value = redisClient.get("key");
    console.log(value);
})();

router.use("/user", userApiAuthenticationRoutes);
router.use("/admin", verifyAccessToken, AdminApiRoutes)
router.use("/", HomeController.indexPage);

module.exports = {
    AllRoutes: router
}
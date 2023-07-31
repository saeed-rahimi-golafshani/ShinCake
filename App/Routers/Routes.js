const { indexPage } = require("../Http/Controllers/Api/Home.Controller");

const router = require("express").Router();

router.use("/", indexPage)

module.exports = {
    AllRoutes: router
}
const { headCategoryApiRoutes } = require("./HeadCategory.Routes");
const router = require("express").Router();

router.use("/headcategory", headCategoryApiRoutes);

module.exports = {
    AdminApiRoutes: router
}
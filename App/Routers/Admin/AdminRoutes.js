const { BlogAdminApiRoutes } = require("./Blog.Routes");
const { CategoryAdminApiRoutes } = require("./Category.Routes");
const { headCategoryAdminApiRoutes } = require("./HeadCategory.Routes");
const router = require("express").Router();

router.use("/headcategory", headCategoryAdminApiRoutes);
router.use("/category", CategoryAdminApiRoutes);
router.use("/blog", BlogAdminApiRoutes)

module.exports = {
    AdminApiRoutes: router
}
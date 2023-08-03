const { HeadCategoryController } = require("../../Http/Controllers/Admin/Category/Headcategory.Controller");

const router = require("express").Router();

router.post("/create", HeadCategoryController.createHeadcategory)

module.exports = {
    headCategoryApiRoutes: router
}
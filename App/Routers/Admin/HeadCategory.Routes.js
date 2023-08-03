const { HeadCategoryController } = require("../../Http/Controllers/Admin/Category/Headcategory.Controller");

const router = require("express").Router();

router.post("/create", HeadCategoryController.createHeadcategory);
router.get("/list", HeadCategoryController.listOfHeadCategory);

module.exports = {
    headCategoryApiRoutes: router
}
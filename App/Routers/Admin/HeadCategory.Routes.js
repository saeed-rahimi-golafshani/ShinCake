const { HeadCategoryController } = require("../../Http/Controllers/Admin/Category/Headcategory.Controller");

const router = require("express").Router();

router.post("/create", HeadCategoryController.createHeadcategory);
router.get("/list", HeadCategoryController.listOfHeadCategory);
router.get("/list/:id", HeadCategoryController.listOfHeadCategoryById);

module.exports = {
    headCategoryApiRoutes: router
}
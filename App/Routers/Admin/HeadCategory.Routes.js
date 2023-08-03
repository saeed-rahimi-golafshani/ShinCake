const { HeadCategoryController } = require("../../Http/Controllers/Admin/Category/Headcategory.Controller");

const router = require("express").Router();

router.post("/create", HeadCategoryController.createHeadcategory);
router.get("/list", HeadCategoryController.listOfHeadCategory);
router.get("/list/:id", HeadCategoryController.listOfHeadCategoryById);
router.patch("/update/:id", HeadCategoryController.updateHeadCategoryById);
router.delete("/remove/:id", HeadCategoryController.removeHeadCategory);

module.exports = {
    headCategoryAdminApiRoutes: router
}
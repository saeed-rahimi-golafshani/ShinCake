const { CategoryController } = require("../../Http/Controllers/Admin/Category/Category.Controller");

const router = require("express").Router();

router.post("/create", CategoryController.createController);
router.get("/list", CategoryController.listOfCategory);
router.get("/list_with_children", CategoryController.listOfCategoryWithChildren);
router.get("/list/:id", CategoryController.listOfCategoryById)

module.exports = {
    CategoryAdminApiRoutes: router
}
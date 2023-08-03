const { CategoryController } = require("../../Http/Controllers/Admin/Category/Category.Controller");

const router = require("express").Router();

router.post("/create", CategoryController.createController);

module.exports = {
    CategoryAdminApiRoutes: router
}
const { BlogController } = require("../../Http/Controllers/Admin/Blog/Blog.Controller");
const { stringToArray } = require("../../Http/Middelwares/StringToArray");
const { uploadFile } = require("../../Uttils/Multer");
const router = require("express").Router();

router.post("/create",
    uploadFile("Blog").fields([{name: "images", maxCount: 10}, {name: "image_refrence", maxCount: 1}]),
    stringToArray("tags"),
    stringToArray("category"),
    stringToArray("source"),
    BlogController.createBlog);

module.exports = {
    BlogAdminApiRoutes: router
}
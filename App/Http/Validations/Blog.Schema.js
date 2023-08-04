const joi = require("joi");
const { FILENMAE_IMAGE_PATTERN } = require("../../Uttils/Constants");
const createHttpError = require("http-errors");

const createBlogSchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوان مقاله اشتباه است")),
    short_text: joi.string().error(createHttpError.BadRequest("ساختار خلاصه متن مقاله اشتباه است")),
    text: joi.string().error(createHttpError.BadRequest("ساختار متن مقاله اشتباه است")),
    filename: joi.string().pattern(FILENMAE_IMAGE_PATTERN).error(createHttpError.BadRequest("ساختار فرمت تصویر ارسالی اشتباه است")),
    fileUploadPath: joi.allow(),
    tags: joi.array().min(0).max(10).error(createHttpError.BadRequest("ساختار تگ یا برچسب اشتباه است")),
    category: joi.array().min(1).max(5).error(createHttpError.BadRequest("ساختار دسته بندی اشتباه است")),
    source: joi.array().min(1).max(10).error(createHttpError.BadRequest("ساختار منابع مقاله اشتباه است"))
});

module.exports = {
    createBlogSchema
}
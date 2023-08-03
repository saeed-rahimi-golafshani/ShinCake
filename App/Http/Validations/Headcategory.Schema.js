const createHttpError = require("http-errors");
const joi = require("joi");

const createHeadCategorySchema = joi.object({
    title: joi.string().min(3).max(30).error(createHttpError.BadRequest("ساختار عنوان سر دسته اشتباه است"))
});

module.exports = {
    createHeadCategorySchema
}
const createHttpError = require("http-errors");
const joi = require("joi");
const { MONGOID_PATTERN } = require("../../Uttils/Constants");

const createCategorySchema = joi.object({
    title: joi.string().min(3).max(50).error(createHttpError.BadRequest("ساختار عنوامن دسته بندی اشتباه است")),
    parent: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار زیر مجموعه دسته بندی اشتباه است")),
    headCategory: joi.string().pattern(MONGOID_PATTERN).error(createHttpError.BadRequest("ساختار سر دسته اشتباه است"))
});

module.exports = {
    createCategorySchema
}
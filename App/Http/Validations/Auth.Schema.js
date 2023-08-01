const createHttpError = require("http-errors");
const Joi = require("joi");

const loginWithOtpSchema = Joi.object({
    mobile: Joi.string().length(11).error(createHttpError.BadRequest("ساختار شماره موبایل مورد نظر اشتباه است"))
});

module.exports = {
    loginWithOtpSchema
}
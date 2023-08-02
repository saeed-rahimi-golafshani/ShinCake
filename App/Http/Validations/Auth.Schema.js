const createHttpError = require("http-errors");
const Joi = require("joi");
const { MOBILE_PATTERN } = require("../../Uttils/Constants");

const loginWithOtpSchema = Joi.object({
    mobile: Joi.string().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل مورد نظر اشتباه است"))
});
const checkLoginScheam = Joi.object({
    mobile: Joi.string().length(11).pattern(MOBILE_PATTERN).error(createHttpError.BadRequest("ساختار شماره موبایل وارد شده اشتباه است")),
    code: Joi.string().min(4).max(6).error(createHttpError.BadRequest("ساختار کد تایید ارسال شده اشتباه است"))
})

module.exports = {
    loginWithOtpSchema,
    checkLoginScheam
}
const { createHeadCategorySchema } = require("../../../Validations/Headcategory.Schema");
const Controller = require("../../Controller");
const { HeadCategoryModel } = require("../../../../Models/HeadCategory.Model");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { objectCopy, nullish } = require("../../../../Uttils/Functions");

class HeadCategoryController extends Controller{
    async createHeadcategory(req, res, next){
        try {
            const requestBody = await createHeadCategorySchema.validateAsync(req.body);
            const { title } = requestBody;
            await this.checkExistHeadCatByTitle(title);
            const headCategory = await HeadCategoryModel.create({title});
            if(!headCategory) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "سر دسته با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfHeadCategory(req, res, next){
        try {
            const headCategory = await HeadCategoryModel.find({});
            if(!headCategory) throw new createHttpError.NotFound("سر دسته ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    headCategory
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfHeadCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const headCategory = await this.checkExistHeadCatById(id);
            const resault = await HeadCategoryModel.findOne({_id: headCategory._id});
            if(!resault) throw new createHttpError.NotFound("سردسته ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    headCategory: resault
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async updateHeadCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistHeadCatById(id);
            const requestData = objectCopy(req.body);
            Object.keys(requestData).forEach(key => {
                if(nullish().includes(requestData[key])) delete requestData[key]
            });
            const updateResault = await HeadCategoryModel.updateOne({_id: checkId._id}, {$set: requestData});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async removeHeadCategory(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistHeadCatById(id);
            const deleteResault = await HeadCategoryModel.deleteOne({_id: checkId._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "عملیات حذف با موفقیت انجام شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistHeadCatByTitle(title){
        const headcategory = await HeadCategoryModel.findOne({title});
        if(headcategory) throw new createHttpError.BadRequest("عنوان سر دسته تکراری است، لطفا عنوان دیگری را انتخاب نمایید");
        return headcategory
    };
    async checkExistHeadCatById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const headCategory = await HeadCategoryModel.findById(id);
        if(!headCategory) throw new createHttpError.NotFound("سردسته ای یافت نشد");
        return headCategory
    }
};

module.exports = {
    HeadCategoryController: new HeadCategoryController()
}
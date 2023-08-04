const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../../Models/Category.Model");
const { createCategorySchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const { objectCopy, nullish } = require("../../../../Uttils/Functions");

class CategoryController extends Controller{
    async createController(req, res, next){
        try {
            const requestBody = await createCategorySchema.validateAsync(req.body);
            const { title, parent, headCategory } = requestBody;
            await this.checkExistCategoryByTitle(title);
            const category = await CategoryModel.create({title, parent, headCategory});
            if(!category) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "دسته بندی با موفقیت ثبت شد"
                }
            });

        } catch (error) {
            next(error)
        }
    };
    async listOfCategory(req, res, next){ 
        try {
            const categories = await CategoryModel.aggregate([
                {
                    $match: {parent: undefined}
                },
                {
                    $lookup: {
                        from: "headcategories",
                        localField: "headCategory",
                        foreignField: "_id",
                        as: "headCategory"
                    }
                },
                {
                    $unwind: "$headCategory"
                },
                {
                    $project: {
                        "__v": 0,
                        "headCategory.__v": 0
                    }
                }
            ])
            if(!categories) throw new createHttpError.NotFound("دسته بندی مورد نظر یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categories
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfCategoryWithChildren(req, res, next){
        try {
            const categories = await CategoryModel.find({parent: undefined}, {__v: 0}).populate([
                {path: "headCategory", select: {__v: 0, children: 0}}
            ]);
            if(!categories) throw new createHttpError.NotFound("دیته بندی مورد نظر یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    categories
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfCategoryById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistCategoryById(id);
            const category = await CategoryModel.findOne({_id: checkId._id}, {__v: 0}).populate([
                {path: "headCategory", select: {__v: 0}}
            ]);
            if(!category) throw new createHttpError.NotFound("دسته بندی یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    category
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async updateCategory(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistCategoryById(id);
            const requestData = objectCopy(req.body);
            const nullishData = nullish();
            Object.keys(requestData).forEach(key => {
                if(nullishData.includes(requestData[key])) delete requestData[key];
            });
            const updateResault = await CategoryModel.updateOne({_id: checkId._id}, {$set: requestData});
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
    async removeCategory(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistCategoryById(id);
            const deleteResault = await CategoryModel.deleteOne({
                $or: [
                    {_id: checkId._id},
                    {parent: checkId._id}
                ]
            });
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "دسته بندی با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategoryByTitle(title){
        const category = await CategoryModel.findOne({title});
        if(category) throw new createHttpError.BadRequest("دسته بندی مورد نظر از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب نمایید");
        return category
    };
    async checkExistCategoryById(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const category = await CategoryModel.findById(id);
        if(!category) throw new createHttpError.NotFound("دسته بندی ای یافت نشد");
        return category
    }
}

module.exports = {
    CategoryController: new CategoryController()
}
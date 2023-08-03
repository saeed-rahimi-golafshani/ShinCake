const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../../Models/Category.Model");
const { createCategorySchema } = require("../../../Validations/Category.Schema");
const Controller = require("../../Controller");
const { StatusCodes: httpStatus } = require("http-status-codes")

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
    }
    async checkExistCategoryByTitle(title){
        const category = await CategoryModel.findOne({title});
        if(category) throw new createHttpError.BadRequest("دسته بندی مورد نظر از قبل ثبت شده است، لطفا عنوان دیگری را انتخاب نمایید");
        return category
    }
}

module.exports = {
    CategoryController: new CategoryController()
}
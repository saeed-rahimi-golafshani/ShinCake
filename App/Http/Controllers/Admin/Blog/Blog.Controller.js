const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { listOfImagesFromRequest, objectCopy, deleteInvalidPropertyObject } = require("../../../../Uttils/Functions");
const { createBlogSchema } = require("../../../Validations/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const blogBlackList = {
    COMMENTS: "comments",
    LIKES: "likes",
    DISLIKES: "dislikes",
    BOOKMARKS: "bookmarks",
    VIEW: "view"
};
Object.freeze(blogBlackList)

class BlogController extends Controller{
    async createBlog(req, res, next){
        try {
            const requestBody = await createBlogSchema.validateAsync(req.body);
            const { title, short_text, text, tags, category, source } = requestBody;
            await this.checkExistBlogWithTitle(title);
            const images = listOfImagesFromRequest(req.files.images || [], requestBody.fileUploadPath);
            req.body.image_refrence = path.join(requestBody.fileUploadPath, requestBody.filename).replace(/\\/g, "/");
            const image_refrence = req.body.image_refrence;
            const author = req.user._id;
            const createBlog = await BlogModel.create({
                author,
                title,
                short_text,
                text,
                images,
                image_refrence,
                tags,
                category,
                source
            });
            if(!createBlog) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: "مقاله با موفقیت ثبت شد"
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async listOfBlog(req, res, next){
        try {
            const { search } = req.query;
            let blog;
            if(search){
                blog = await BlogModel.findOne({
                    $text: {
                        $search: new RegExp(search, "ig")
                    }
                }).populate([
                    {path: "category", select: {__v: 0}},
                    {path: "author", select: {firstname: 1, lastname: 1}}
                ]);
            } else {
                blog = await BlogModel.find({}).populate([
                    {path: "category", select: {__v: 0}},
                    {path: "author", select: {firstname: 1, lastname: 1}}
                ]);
            }
            if(!blog) throw new createHttpError.NotFound("مقاله ای یافت نشد")
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blog
                }
            });
        } catch (error) {
            next
            (error)
        }
    };
    async listOfBlogById(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistBlogWithId(id);
            const blog = await BlogModel.findOne({_id: checkId._id}).populate([
                {path: "category", select: {__v: 0}},
                {path: "author", select: {firstname: 1, lastname: 1}}
            ]);
            if(!blog) throw new createHttpError.NotFound("مقاله ای یافت نشد");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    blog
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async updateBlog(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistBlogWithId(id);
            const requestData = objectCopy(req.body);
            if(requestData.fileUploadPath && requestData.filename){
                requestData.images = listOfImagesFromRequest(req?.files?.images, requestData.fileUploadPath);
                requestData.image_refrence = path.join(requestData.fileUploadPath, requestData.filename).replace(/\\/g, "/");
            };
            const blaklist = Object.values(blogBlackList);
            deleteInvalidPropertyObject(requestData, blaklist);
            const updateResault = await BlogModel.updateOne({_id: checkId._id}, {$set: requestData});
            if(updateResault.modifiedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "به روز رسانی مقاله با موفقیت انجام شد"
                }
            });

        } catch (error) {
            next(error)
        }
    };
    async removeBlog(req, res, next){
        try {
            const { id } = req.params;
            const checkId = await this.checkExistBlogWithId(id);
            const deleteResault = await BlogModel.deleteOne({_id: checkId._id});
            if(deleteResault.deletedCount == 0) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    message: "مقاله مورد نظر با موفقیت حذف شد"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async checkExistBlogWithTitle(title){
        const blog = await BlogModel.findOne({title});
        if(blog) throw new createHttpError.BadRequest("عنوان مقاله تکراری است، لطفا عنوان دیگری را انتخاب نمایید");
        return blog
    };
    async checkExistBlogWithId(id){
        if(!mongoose.isValidObjectId(id)) throw new createHttpError.BadRequest("ساختار شناسه مورد نظر اشتباه است");
        const blog = await BlogModel.findById(id);
        if(!blog) throw new createHttpError.NotFound("مقاله مورد نظر یافت نشد");
        return blog
    }
};

module.exports = {
    BlogController: new BlogController()
}
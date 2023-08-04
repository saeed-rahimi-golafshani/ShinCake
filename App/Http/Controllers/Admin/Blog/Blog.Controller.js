const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../Models/Blog.Model");
const { listOfImagesFromRequest } = require("../../../../Uttils/Functions");
const { createBlogSchema } = require("../../../Validations/Blog.Schema");
const Controller = require("../../Controller");
const path = require("path");
const { StatusCodes: httpStatus } = require("http-status-codes")

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
                })
            } else {
                blog = await BlogModel.find({});
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
    }
    async checkExistBlogWithTitle(title){
        const blog = await BlogModel.findOne({title});
        if(blog) throw new createHttpError.BadRequest("عنوان مقاله تکراری است، لطفا عنوان دیگری را انتخاب نمایید");
        return blog
    };
};

module.exports = {
    BlogController: new BlogController()
}
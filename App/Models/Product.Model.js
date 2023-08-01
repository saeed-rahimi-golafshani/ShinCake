const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Model");
const { QuestionSchema } = require("./Question.Model");

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    introduction: {type: String, required: true},
    images: {type: [String], required: true, default: []},
    imageRefrence: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    mainPrice: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    price: {type: Number, default: 0},
    count: {type: Number, default: 0},
    description: {type: String},
    active: {type: Boolean},
    comments: {type: [CommentSchema], default: []},
    questions: {type: [QuestionSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    ProductModel: mongoose.model("product", ProductSchema)
}
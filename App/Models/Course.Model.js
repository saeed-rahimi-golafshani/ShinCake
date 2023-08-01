const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./Comment.Model");
const { QuestionSchema } = require("./Question.Model");

const Episode = new mongoose.Schema({
    title: {type: String, required: true},
    text: {type: String, required: true},
    type: {type: String, default: "unlock"},
    time: {type: String, required: true},
    videoAddress: {type: String, required: true}
}, {
    toJSON: { virtuals: true }
});
const CouresSchema = new mongoose.Schema({
    title: {type: String, required: true},
    short_text: {type: String, required: true},
    text: {type: String, required: true},
    image: {type: String, required: true},
    tags: {type: [String], default: []},
    category: {type: mongoose.Types.ObjectId, ref: "headcategory", required: true},
    comments: {type: [CommentSchema], default: []},
    questions: {type: [QuestionSchema], default: []},
    likes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    dislikes: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    bookmarks: {type: [mongoose.Types.ObjectId], ref: "user", default: []},
    mainPrice: {type: Number, default: 0},
    discount: {type: Number, default: 0},
    price: {type: Number, default: 0},
    type: {type: String, default: "free", required: true},
    status: {type: String, required: true, default: "NotStarted"},
    teacher: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    episode: {type: [Episode], default: []},
    students: {type: [mongoose.Types.ObjectId], default: [], ref: "user"}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports ={
    CourseModel : mongoose.model("course", CouresSchema)
}
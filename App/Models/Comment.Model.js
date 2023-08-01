const { default: mongoose } = require("mongoose");

const CommentSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    title: {type: String},
    comment: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    score: {type: mongoose.Types.ObjectId, ref: "user"}
}, {
    timestamps: {createdAt: true}
});

module.exports = {
    CommentSchema
}
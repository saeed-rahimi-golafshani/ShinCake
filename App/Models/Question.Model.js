const { default: mongoose } = require("mongoose");

const AnswereSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: "user", required: true},
    answwre: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    openToAnswere: {type: Boolean, default: false}
});
const QuestionSchema = new mongoose.Schem({
    user: {type: mongoose.Types.ObjectId, required: true, ref: "user"},
    title: {type: String, required: true},
    question: {type: String, required: true},
    show: {type: Boolean, required: true, default: false},
    openToQuestion: {type: Boolean, default: true},
    likes: {type: mongoose.Types.ObjectId, ref: "user"},
    dislikes: {type: mongoose.Types.ObjectId, ref: "user"},
    answers: {type: [AnswereSchema], default: []}
});

module.exports = {
    QuestionSchema
}
const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref: "category"},
    headCategory: {type: mongoose.Types.ObjectId, ref: "headcategory"}
}, {
    toJSON: {
        virtuals: true
    }
});

module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema)
};
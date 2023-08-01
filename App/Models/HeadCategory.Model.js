const { default: mongoose } = require("mongoose");

const HeadCategorySchema = new mongoose.Schema({
    title: {type: String, required: true},
});

module.exports = {
    HeadCategoryModel: mongoose.model("headcategory", HeadCategorySchema)
};
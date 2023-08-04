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
CategorySchema.virtual("children", {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});
function autoPopulate(next){
    this.populate([
        {path: "children", select: {__v: 0, id: 0, createdAt: 0, updatedAt: 0}}
    ]);
    next()
}
CategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate)
CategorySchema.index({title: "text"});

module.exports = {
    CategoryModel: mongoose.model("category", CategorySchema)
};
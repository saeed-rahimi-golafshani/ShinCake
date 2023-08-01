const { default: mongoose } = require("mongoose");

const CategoryAttributeSchema = new mongoose.Schema({
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    label: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports = {
    CategoryAttributeModel: mongoose.model("categoryAttribute", CategoryAttributeSchema)
};
const { default: mongoose } = require("mongoose");

const ProductCategoryAttributeSchema = new mongoose.Schema({
    product: {type: mongoose.Types.ObjectId, ref: "product", required: true},
    category: {type: mongoose.Types.ObjectId, ref: "category", required: true},
    value: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports = {
    ProductCategoryAttributeModel: mongoose.model("productCategoryAttribute", ProductCategoryAttributeSchema)
};
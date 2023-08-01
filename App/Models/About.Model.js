const { default: mongoose } = require("mongoose");

const AboutSchema = new mongoose.Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String},
    category: {type: mongoose.Types.ObjectId, ref: "headcategory"}
}, {
    toJSON: { virtuals: true }
});

module.exports = {
    AboutModel: mongoose.model("about", AboutSchema)
};
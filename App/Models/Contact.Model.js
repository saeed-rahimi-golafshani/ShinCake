const { default: mongoose } = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
    title: {type: String},
    icon: {type: String},
    link: {type: String}
})
const ContactSchema = new mongoose.Schema({
    phone: {type: String},
    email: {type: String},
    address: {type: String},
    fax: {type: String},
    category: {type: mongoose.Types.ObjectId, ref: "headcategory"},
    socialMedia: {type: [SocialMediaSchema], default: []}
});

module.exports = {
    ContactModel: mongoose.model("contact", ContactSchema)
};
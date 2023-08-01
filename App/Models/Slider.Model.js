const { default: mongoose } = require("mongoose");

const SliderSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    images: {type: [String], default: [], required: true}
});

module.exports = {
    SliderModel: mongoose.model("slider", SliderSchema)
};
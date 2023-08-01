const { default: mongoose } = require("mongoose");

const AddressSchema = new mongoose.Schema({
    state: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    postalCode: {type: String, required: true}
});
const CourseSchema = new mongoose.Schema({
    courseId: {type: mongoose.Types.ObjectId, red: "course"},
    count: {type: Number, default: 1}
});
const ProductSchema = new mongoose.Schema({
    productId: {type: mongoose.Types.ObjectId, ref: "product"},
    courseId: {type: mongoose.Types.ObjectId, red: "course"},
    count: {type: Number, default: 1}
});
const BasketSchema = new mongoose.Schema({
    ProductId: {type: [ProductSchema], default: []},
    CourseId: {type: [CourseSchema], default: []}
});
const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    email: {type: String, lowercase: true},
    mobile: {type: String, required: true},
    phone: {type: String},
    password: {type: String},
    otp: {type: Object, default: {code: 0, expiresIn: 0}},
    bills: {type: [], default: []},
    discount: {type: Number, default: 0},
    birthday: {type: String},
    address: {type: AddressSchema},
    roles: {type: String, default: "USER"},
    Product: {type: [mongoose.Types.ObjectId], default: [], ref: "product"},
    Course: {type: [mongoose.Types.ObjectId], default: [], ref: "course"},
    basket: {type: BasketSchema}
}, {
    timestamps: true,
    toJSON: { virtuals: true }
});

module.exports = {
    UserModel: mongoose.model("user", UserSchema)
};
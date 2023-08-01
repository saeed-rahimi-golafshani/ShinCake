const { randomNumberFiveDigitsGenerator, nullish } = require("../../../Uttils/Functions");
const { loginWithOtpSchema } = require("../../Validations/Auth.Schema");
const Controller = require("../Controller");
const { UserModel } = require("../../../Models/User.Model");
const { ROLES } = require("../../../Uttils/Constants");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");

class AuthenticationController extends Controller{
    async loginWithOtp(req, res, next){
        try {
            const requestBody = await loginWithOtpSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            const code = randomNumberFiveDigitsGenerator();
            const resault = await saveUser(mobile, code);
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: `کد تایید برای شماره ${mobile} ارسال شد`
                }
            })
        } catch (error) {
            next(error)
        }
    };
    async saveUser(mobile, code){
        let otp = {
            code, 
            expiresIn: (new Date().getTime() + (process.env.OTP_EXPIRESIN))
        };
        const resault = await this.checkExistUser(mobile);
        if(resault){
            return await this.updateUser(mobile, {otp})
        } else {
            return !!(await UserModel.create({
                mobile,
                otp,
                roles: ROLES.BUYER
            }))
        }
    };
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user
    };
    async updateUser(mobile, dataObj = {}){
        const nullishData = nullish();
        Object.keys(dataObj).forEach(key => {
            if(nullishData.includes(dataObj[key])) delete dataObj[key]
        });
        const updateResault = await UserModel.updateOne({mobile}, {$set: dataObj});
        return !!updateResault.modifiedCount
    }
};

module.exports = {
    AuthenticationController: new AuthenticationController()
}
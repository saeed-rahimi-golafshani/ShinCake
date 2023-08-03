const { randomNumberFiveDigitsGenerator, nullish } = require("../../../Uttils/Functions");
const { loginWithOtpSchema, checkLoginScheam } = require("../../Validations/Auth.Schema");
const Controller = require("../Controller");
const { UserModel } = require("../../../Models/User.Model");
const { ROLES } = require("../../../Uttils/Constants");
const createHttpError = require("http-errors");
const { StatusCodes: httpStatus } = require("http-status-codes");
const { smsClient } = require("../../../Uttils/Sms.Panel");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../../../Uttils/Token");

class AuthenticationController extends Controller{
    async loginWithOtp(req, res, next){
        try {
            const requestBody = await loginWithOtpSchema.validateAsync(req.body);
            const { mobile } = requestBody;
            const code = randomNumberFiveDigitsGenerator();
            const resault = await this.saveUser(mobile, code);
            if(!resault) throw new createHttpError.InternalServerError("خطای سروری");
            // await smsClient(mobile, code)
            return res.status(httpStatus.CREATED).json({
                statusCode: httpStatus.CREATED,
                data: {
                    message: `کد تایید برای شماره ${mobile} ارسال شد`,
                    code // باید حذف شود
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
    };
    async checkLogin(req, res, next){
        try {
            const requestBody = await checkLoginScheam.validateAsync(req.body);
            const { mobile, code } = requestBody;
            const user = await UserModel.findOne({mobile});
            let now = Date.now();
            if(!user) throw new createHttpError.NotFound("کاربر مورد نظر یافت نشد");
            if(user.otp.code != code) throw new createHttpError.Unauthorized("کد تایید ارسال شده صحیح نمیباشد");
            if(+user.otp.expiresIn < now) throw new createHttpError.Unauthorized("کد تایید منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken 
                }
            });
        } catch (error) {
            next(error)
        }
    };
    async getRefreshToken(req, res, next){
        try {
            const { refreshToken } = req.body;
            console.log(refreshToken);
            const mobile = verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({mobile});
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.status(httpStatus.OK).json({
                statusCode: httpStatus.OK,
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            });
        } catch (error) {
            next(error)
        }
    }
};

module.exports = {
    AuthenticationController: new AuthenticationController()
}
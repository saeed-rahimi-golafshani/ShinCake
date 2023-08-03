const express = require("express");
const path = require("path");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const http = require("http");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const morgan = require("morgan");
const { AllRoutes } = require("./Routers/Routes");
module.exports = class Application{
    #app = express();
    #PORT;
    #DB_URL;
    constructor(Port, Db_Url){
        this.#PORT = Port;
        this.#DB_URL = Db_Url;
        this.ConfigApplication();
        this.initConfigRedis();
        this.configDatabaseToMongoDb();
        this.createServer();
        this.createRoutes();
        this.errorHandler();
    }
    ConfigApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "Public")));
        this.#app.use(morgan("dev"));
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup( 
            swaggerJsDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
                    info : {
                        title: "ShinCake Website",
                        version: "2.0.0",
                        description: "وب سایت فروشگاهی خرید و سفارش آنلاین شیرینی و کیک"
                    },
                    servers : [{
                        url : `${process.env.BASEURL}:${this.#PORT}`
                    }],
                    components:{
                        securitySchemes:{
                            BearerAuth:{
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT" 
                            }
                        }
                    },
                    security: [{BearerAuth: []}]
                },
                apis: ["./App/Routers/**/*.js"]
            }), 
            {explorer: true}
            )
        )
    }
    initConfigRedis(){
        require("./Uttils/Init.Redis")
    }
    configDatabaseToMongoDb(){
        mongoose.set('strictQuery', 'false')
        mongoose.connect(this.#DB_URL, (error) => {
            if(!error) return console.log("Application is connected to mongoDb...");
            return console.log("Application is not connected to mongoDb...");
        })
        const db = mongoose.connection;
        db.on("connected", () => {
            console.log("Mongoose Connected to DB...");
            })
            db.on("disconnected", () =>{
                console.log("Mongoose Connection Is Disconnected...");
            })
            process.on("SIGINT", async () =>{
                await db.close();
                console.log("disconnected...");
                process.exit(0)
            })
    }
    createServer(){
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`server running in mode on prot ${process.env.BASEURL}:${this.#PORT}`);
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHandler(){
        this.#app.use((req, res, next) =>{
            next(createHttpError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) => {
            const servererror = createHttpError.InternalServerError();
            const statusCode = error?.status || servererror.status ;
            const message = error?.message || servererror.message
            return res.status(statusCode).send({
                errors : {
                    statusCode,
                    message
                }
            })
        })
    }
}
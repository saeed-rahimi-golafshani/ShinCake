const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createHttpError = require("http-errors");

function createRoute(req, file, folderName){ 
    const { title } = req.body;
    if(title){
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      const directory = path.join(__dirname, "..", "..", "Public", "Uploads", folderName, file, year, month, day, `${title}`)
      req.body.fileUploadPath = path.join("Uploads", folderName, file, year, month, day, `${title}`);
      fs.mkdirSync(directory, {recursive: true});
      return directory  
    } else {
      const date = new Date();
      const year = date.getFullYear().toString();
      const month = date.getMonth().toString();
      const day = date.getDate().toString();
      const directory = path.join(__dirname, "..", "..", "Public", "Uploads", folderName, file, year, month, day)
      req.body.fileUploadPath = path.join("Uploads", folderName, file, year, month, day);
      fs.mkdirSync(directory, {recursive: true});
      return directory
    }
}
const uploadFile = (folderName) => {
    return imageUpload = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          if(file?.originalname){
            const filePath  = createRoute(req, file.fieldname, folderName);
            return cb(null, filePath);
          } cb(null, null)
        },
        filename: (req, file, cb) => {
            if(file?.originalname){
                const ext = path.extname(file.originalname)
                const fileName = String(new Date().getTime()) + ext;
                req.body.filename = fileName;
                return cb(null, fileName);
            } cb(null, null)       
        }
      }),
      limits: { fileSize: 10000000 },
      fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const mimetypes = [".jpeg", ".jpg", ".png", ".webp", ".gif", ".jfif", ".avif", ".svg", ".ico"];
        if(mimetypes.includes(ext)){
        return cb(null, true)
     } 
     return cb(createHttpError.BadRequest("فرمت تصویر ارسالی صحیح نمیباشد"))       
      }
    })
  }

  module.exports = {
    uploadFile
  }
const path = require("path");

function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000);
};
function nullish(){
    const nullishData = ["", " ", 0, NaN, null, undefined];
    return nullishData
};
function objectCopy(object){
    return JSON.parse(JSON.stringify(object));
};
function listOfImagesFromRequest(files, fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath, file.filename)).map(item => item.replace(/\\/g, "/")));
    } else {
        return []
    }
};

module.exports = {
    randomNumberFiveDigitsGenerator,
    nullish,
    objectCopy,
    listOfImagesFromRequest
}
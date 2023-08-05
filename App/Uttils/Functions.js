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
function deleteInvalidPropertyObject(data = {}, blackList = [] ){
    const nullishData = nullish();
    Object.keys(data).forEach(key => {
        if(blackList.includes(key)) delete data[key];
        if(nullishData.includes(data[key])) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]).length > 0) data[key] = data[key].map(item => item.trim);
        if(Array.isArray(data[key]).length == 0) delete data[key]
    })
    return data
}

module.exports = {
    randomNumberFiveDigitsGenerator,
    nullish,
    objectCopy,
    listOfImagesFromRequest,
    deleteInvalidPropertyObject
}
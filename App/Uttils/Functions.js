
function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000);
};
function nullish(){
    const nullishData = ["", " ", 0, NaN, null, undefined];
    return nullishData
}
function objectCopy(object){
    return JSON.parse(JSON.stringify(object));
}

module.exports = {
    randomNumberFiveDigitsGenerator,
    nullish,
    objectCopy
}
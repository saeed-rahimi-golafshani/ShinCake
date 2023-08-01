
function randomNumberFiveDigitsGenerator(){
    return (Math.floor(Math.random() * 90000) + 10000);
};
function nullish(){
    const nullishData = ["", " ", 0, NaN, null, undefined];
    return nullishData
}

module.exports = {
    randomNumberFiveDigitsGenerator,
    nullish
}
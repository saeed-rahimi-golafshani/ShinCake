const stringToArray = function(...args){
    return function(req, res, next){
        const feilds = args;
        feilds.forEach(feild => {
            if(req.body[feild]){
                if(typeof req.body[feild] == "string"){
                    if(req.body[feild].indexOf("#")){
                        req.body[feild] = (req.body[feild].split("#")).map(item => item.trim());
                    } else if(req.body[feild].indexOf(",")){
                        req.body[feild] = (req.body[feild].split(",")).map(item => item.trim());
                    } else {
                        req.body[feild] = [req.body[feild]]
                    }
                } 
                if(Array.isArray(req.body[feild])){
                    req.body[feild] = req.body[feild].map(item => item.trim());
                    req.body[feild] = [... new Set(req.body[feild])]
                }
            } else {
                req.body[feild] = []
            }
        })
        next()
    }
};

module.exports = {
    stringToArray
}
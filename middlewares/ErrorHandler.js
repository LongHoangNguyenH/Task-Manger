const constant = require('../constant');
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statuscode ? res.statuscode : 500
    switch(statuscode){
        case constant.VALIDATION_ERROR:
            res.json({title: "VALIDATION_ERROR", message: err.message, stackTrace: err.stack});
            break;
        case constant.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED", message: err.message, stackTrace: err.stack});
            break;
        case constant.FORBIDDEN:
            res.json({title: "FORBIDDEN", message: err.message, stackTrace: err.stack});
            break;
        case constant.NOT_FOUND:
            res.json({title: "NOT_FOUND", message: err.message, stackTrace: err.stack});
            break;
        case constant.SERVER_ERROR:
            res.json({title: "SERVER_ERROR", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("Everything is working normally");
            break;
    }
}
module.exports = errorHandler;
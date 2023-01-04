class ErrorHandler extends Error {
    constructor(messsage, statuscode){
        super(messsage);
        this.statuscode = statuscode;

        Error.captureStackTrace(this, this.constructor)
    }

}

module.exports = ErrorHandler;
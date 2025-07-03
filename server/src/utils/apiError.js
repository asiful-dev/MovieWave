class apiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", stack = "", errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.data = null;

        (stack ? this.stack = stack : Error.captureStackTrace(this, this.constructor))
    }
}

export default apiError;
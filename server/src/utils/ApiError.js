class ApiError extends Error {
    constructor(stausCode, message = "Error Occurred!", stack = "", errors = []) {
        super(message);
        this.statusCode = stausCode;
        this.errors = errors;
        this.success = false;
        this.data = null;

        (stack ? this.stack = stack : Error.captureStackTrace(this, this.constructor))
    }
}

export default ApiError;
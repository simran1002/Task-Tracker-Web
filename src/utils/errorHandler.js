const ErrorHandler = (err, req, res, next) => {
    const errStatus = err.status || 500;  // default 500 server error
    const errMsg = err.message || 'Something went wrong'; // default message for server error
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {} // show stack trace only in development mode
    })
}

export default ErrorHandler

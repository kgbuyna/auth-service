import { ErrorRequestHandler } from "express"
import { ApiResponse } from "../types/base.js"

const ErrorHandler: ErrorRequestHandler<any, ApiResponse> = (err: Error, req, res, next) =>{
    res.send({
        status:"error",
        message: err.message,
    })
    next()
}

export default ErrorHandler
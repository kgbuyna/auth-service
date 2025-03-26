import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../types/base.js";

export const authenticateToken: RequestHandler<any, ApiResponse> = async (
    req,
    res,
    next,
) => {
  const headers = req.headers;

    const Authorization = (headers.authorization || "").split("Bearer ");
    if (Authorization.length != 2) {
        next(new Error("Header not provided"));
    }

    const token = Authorization[1];
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET!);
        req.userId = (decodedToken as jwt.JwtPayload).id!;
        req.username = (decodedToken as jwt.JwtPayload).username!;
        next();
    }
    catch(error){
        res.status(401);
        // res.send({
        //     status: "error",
        //     message: "Unauthorized",
        // });
        next(error)
    }
};

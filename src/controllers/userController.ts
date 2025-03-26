import { RequestHandler } from "express";

import { ApiResponse } from "../types/base";

import handleGetUsers from "../services/handleGetUsers";

export const GetUsers: RequestHandler<any, ApiResponse> = async (
    req, 
    res, 
    next,
  ) => {
    try {

      const userId = req.userId;
      const users = await handleGetUsers(userId)
      res.send({
        status:"success",
        message:"Login succeed",
        data: {
          users
        }
      })
    } catch(error) {
      next(error)
    }
  }
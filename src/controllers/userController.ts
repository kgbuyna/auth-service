import { RequestHandler } from "express";

import { ApiResponse } from "../types/base";

import handleGetUsers from "../services/handleGetUsers";
import handleGetUserById from "../services/handleGetUserById";

export const GetUsers: RequestHandler<any, ApiResponse> = async (
    req, 
    res, 
    next,
  ) => {
    try {
      const userId = req.headers["x-user-id"] as string;
      const users = await handleGetUsers(userId)
      res.send({
        status:"success",
        message:"Ok",
        data: {
          users
        }
      })
    } catch(error) {
      next(error)
    }
  }

export const GetUserById: RequestHandler<any, ApiResponse> = async (
    req, 
    res, 
    next,
  ) => {
    try {
      console.log(req.params);
      const { id } = req.params;
      const user = await handleGetUserById(id)
      res.send({
        status:"success",
        message:"Ok",
        data: {
          user
        }
      })
    } catch(error) {
      next(error)
    }
  }
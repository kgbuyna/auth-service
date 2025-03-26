import { RequestHandler } from "express";
import { ApiResponse } from "../types/base";
import handleRegister from "../services/handleRegister";
import { handleLogin } from "../services/handleLogin";
import LoginSchema from "src/schema/loginSchema";
import {InferOutput} from 'valibot';

export const Register: RequestHandler<any, ApiResponse> = async (
    req,
    res,
    next
  ) => {
    const data = req.body;
    try {
      const { username, token } = await handleRegister(data);
      res.send({
          status: "success",
          message: "Register succeed",
          data: {
              user: username,
              token: token,
          },
      })
    }
    catch(error) {
      next(error)
    }
  };

  type LoginReqBody = InferOutput<typeof LoginSchema>

  export const Login: RequestHandler<any, ApiResponse, LoginReqBody> = async (
    req,
    res,
    next,
  ) => {
    try {
      const { password, username } = req.body

      const token = await handleLogin(password, username)
      res.send({
        status:"success",
        message:"Login succeed",
        data: {
          token
        }
      })
    } catch(error) {
      next(error)
    }
  };

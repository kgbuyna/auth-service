import { RequestHandler } from 'express';
import * as v from 'valibot';
import { ApiRequest, ApiResponse } from '../types/base.js';


type ValidatorType = <TSchema extends v.BaseSchema<any, any, any> | v.BaseSchemaAsync<any, any, any>>(
  schema: TSchema
) => RequestHandler<ApiRequest, ApiResponse, any>;

export const validator: ValidatorType = (schema) => async (req, res, next) => {
  const body = req.body;
  const data = 'async' in schema && schema.async 
    ? await v.safeParseAsync(schema, body)
    : v.safeParse(schema, body);

  if (data.success) {
    req.body = data.output;
    next();
  } else {
    res.send({
      status: "error",
      messages: (data.issues as v.ValiError<v.AnySchema>[]).map(error => error.message),
    });
  }
};
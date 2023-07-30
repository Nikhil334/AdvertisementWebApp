import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

const registerValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    mobNumber:Joi.number().min(9999999999).max(999999999999),
    firstName:Joi.string().min(3).required(),
    lastName:Joi.string().min(3).required(),
  });


const loginValidation = Joi.object({
    username:Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });


const validatedata = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    req.body = value;
    next();
  };
};



export const checkRegisterData = validatedata(registerValidation);
export const checkLogindata = validatedata(loginValidation);
import Joi from "joi"
export const signupDto  =  (val)=>{
   const userSchema = Joi.object({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
   })


   return userSchema.validate(val)

}

export const signinDto  =  (val)=>{
   const credinatiolsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
   })


   return credinatiolsSchema.validate(val)

}


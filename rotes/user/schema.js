const Joi = require('joi');

const authSchema = Joi.object({
    username: Joi.string().required().min(3).max(15),
    lastname: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(3).max(10),
    isAdmin: Joi.boolean().default(false)    
});

const loginSchema = Joi.object({
    username: Joi.string().required().min(3).max(15),
    password: Joi.string().required().min(3).max(10)    
})


module.exports = { authSchema: authSchema, loginSchema: loginSchema } 
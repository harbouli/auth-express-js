import Joi from 'joi'

/**
 * Validate user registration data.
 * @function
 * @param {Object} val - The user registration data to validate.
 * @returns {Object} - Validation result containing error details.
 */
export const signupDto = (val) => {
  const userSchema = Joi.object({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().required().min(2),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  })

  return userSchema.validate(val)
}

/**
 * Validate user login credentials.
 * @function
 * @param {Object} val - The user login credentials to validate.
 * @returns {Object} - Validation result containing error details.
 */
export const signinDto = (val) => {
  const credentialsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  })

  return credentialsSchema.validate(val)
}

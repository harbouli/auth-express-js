import { userModal } from '../models/userSchema.js'
import { signinDto, signupDto } from '../joi/userDto.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 * Controller methods for user authentication.
 * @namespace auth
 */
export const auth = {
  /**
   * Register a new user.
   * @function
   * @async
   * @memberof auth
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - A Promise that resolves after processing.
   */
  signup: async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body

      // Validate input using Joi schema
      const { error } = signupDto(req.body)
      if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
      }

      // Check if the user already exists
      const existUser = await userModal.findOne({ email })
      if (existUser) {
        res.status(409).json({
          message:
            'This user already exists!! Please create a new one with another email',
        })
        return
      }

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = await userModal.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      })

      // Generate a token for the newly created user
      const newToken = generateToken({
        sub: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role
      })

      res
        .status(201)
        .json({ message: 'User created successfully', token: newToken })
    } catch (error) {
      res.status(500).json({ message: 'Server error: ' + error })
      throw new Error(error)
    }
  },

  /**
   * Sign in an existing user.
   * @function
   * @async
   * @memberof auth
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Promise<void>} - A Promise that resolves after processing.
   */
  signin: async (req, res) => {
    try {
      const { email, password } = req.body

      // Validate input using Joi schema
      const { error } = signinDto(req.body)
      if (error) {
        res.status(400).json({ message: error.details[0].message })
        return
      }

      // Check if the user with the provided email exists
      const user = await userModal.findOne({ email })
      if (!user) {
        res.status(401).json({ message: 'Email or password is incorrect' })
        return
      }

      // Compare the provided password with the stored hashed password
      const comparePassword = await bcrypt.compare(password, user.password)
      if (!comparePassword) {
        res.status(401).json({ message: 'Email or password is incorrect' })
        return
      }

      // Generate a token for the authenticated user
      const token = generateToken({
        sub: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      })

      res.status(200).json({ token })
    } catch (error) {
      console.log(error)
    }
  },
}

/**
 * Generate a JSON Web Token (JWT) for authentication.
 * @function
 * @param {Object} payload - Payload to be included in the token.
 * @returns {string} - The generated JWT.
 */
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
    expiresIn: '1d',
  })
  return token
}

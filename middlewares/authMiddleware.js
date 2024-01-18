import jwt from 'jsonwebtoken'

/**
 * Authentication middleware for protecting routes using JWT.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {Promise<void>} - A Promise that resolves after processing.
 */
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers?.authorization?.split(' ')[1]

    // Check if the token is missing
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    // Verify the token using the secret key
    const verifyToken = jwt.verify(token, process.env.SECRET_TOKEN)

    // Check if the token is valid
    if (!verifyToken) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    // Attach the user information from the token to the request object
    req.user = { ...verifyToken }

    // Log the user information (you may customize or remove this log statement)
    console.log(req.user)

    // Continue to the next middleware or route handler
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
}

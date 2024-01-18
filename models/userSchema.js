import mongoose from 'mongoose'

const User = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type: String,
    enum:["admin", "user"],
    required: true,
    default: "user",
  }
})
export const userModal = mongoose.model('user', User)

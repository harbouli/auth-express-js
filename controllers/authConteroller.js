import { userModal } from "../models/userSchema.js"
import { signinDto, signupDto } from "../joi/userDto.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const auth ={

    signup: async (req,res)=>{
        
        
        try {
            const {email,password,firstName,lastName} = req.body

            const { error} =  signupDto(req.body)
            if (error) {
                res.status(400).json({message:error.details[0].message})
                return
            }
          

            const existUser = await  userModal.findOne({email})
            if (existUser){
                res.status(409).json({message:"This user already exists!! Please create a new one with other email"})
                return
            }


            const hachedPassword = await bcrypt.hash(password,12)
            const newUser = await userModal.create({email,password:hachedPassword,firstName,lastName})
            const newToken =generateToken({sub:newUser._id,firstName:newUser.firstName,lastName:newUser.lastName})

            res.status(201).json({message:"User created successfully",token:newToken})

            
        } catch (error) {
            res.status(500).json({message:"Server error: " + error})
            throw new Error(error)

            
        }


    },
    signin: async  (req,res)=>{

        try {
            const {email,password}=req.body
    
            const { error} =  signinDto(req.body)
                if (error) {
                    res.status(400).json({message:error.details[0].message})
                    return
                }
            const user = await userModal.findOne({email})
            if(!user){
                res.status(401).json({message:"email or password is incorrect"})
                return
            }
            const comperPassword = await bcrypt.compare(password,user.password)
            if(!comperPassword){
                res.status(401).json({message:"email or password is incorrect"})
                return
            }

            const token =  generateToken({sub:user._id,firstName:user.firstName,lastName:user.lastName})

            res.status(200).json({token})
        } catch (error) {
            console.log(error)
        }

        
    }

    
}

const generateToken =  (payload)=>{
 const token =  jwt.sign(payload, process.env.SCRETE_TOKEN, {
    expiresIn: '1d',
    
 })
 return token
}
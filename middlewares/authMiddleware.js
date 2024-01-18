import jwt from 'jsonwebtoken'
export const authMiddleware =async (req,res,next)=>{
try {

    const token = req.headers?.authorization?.split(' ')[1]

    if(!token){
        res.status(401).json({message:"unauthorized"})
        return
        
    }
    const verifyToken = jwt.verify(token,process.env.SCRETE_TOKEN)
    if(!verifyToken){
        res.status(401).json({message:"unauthorized"})   
        return
        }
        req.user ={...verifyToken}
        console.log(req.user)
    next()
    
} catch (error) {
    console.log(error)
    res.status(401).json({message:"unauthorized"})   
    return
}

}
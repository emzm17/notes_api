const userModel=require('../model/user')
const bycrpt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SECRET_KEY=process.env.SECRET_KEY

const signup=async(req,res)=>{
        // Existing user check
        // hashed Password 
        // User Creation
        // Token Generate


        const {username,email,password}=req.body
        try{
               const existinguser=await userModel.findOne({email:email})
               if(existinguser){
                 return res.status(400).json({message:'user already exist'})
               }
               const hashedPassword= await bycrpt.hash(password,10)
               const result= await userModel.create({
                  email:email,
                  password:hashedPassword,
                  username:username
               })
                const token=jwt.sign({email:result.email,userId:result._id},SECRET_KEY)
                res.status(201).json({user:result,token:token})
        }catch(err){
              console.log(err)
              res.status(500).json({message:'something went wrong'})
        }
        


}


const signin=async (req,res)=>{
            const{email,password}=req.body
            try{
                const existinguser=await userModel.findOne({email:email})
                if(!existinguser){
                  return res.status(404).json({message:'user not found'})
                }
                const matchpassword=await bycrpt.compare(password,existinguser.password)
                if(!matchpassword){
                       return res.status(400).json({message:"Invalid Credentials"})
                }
                const token=jwt.sign({email:existinguser.email,userId:existinguser._id},SECRET_KEY)
                res.status(200).json({user:existinguser,token:token})

                 
            }catch(err){
                console.log(err)
                res.status(500).json({message:'something went wrong'})
            }

}

module.exports={signin,signup}



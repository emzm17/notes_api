const jwt=require('jsonwebtoken')
const auth=(req,res,next)=>{
     try{
        let token = req.headers.authorization
        if(token){
            token = token.split(" ")[1]
            let user=jwt.verify(token,'note_api')
            req.userId = user.userId
        }
        else{
            res.status(401).json({message:"Unauthorized Access"})
        }
        next()

     }catch(err){
              console.log(err)
              res.status(401).json({message:"Unauthorized Access"})
     }
}
module.exports=auth
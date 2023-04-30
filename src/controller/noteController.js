const noteModel=require('../model/note')

const createNote=async(req,res)=>{
     const {title,description}=req.body
     const newNote=new noteModel({
         title:title,
         description:description,
         userid:req.userId
     })
     try{
         
         await newNote.save()
         res.status(201).json(newNote)
         
     }catch(err){
          console.log(err)
          res.status(500).json({message:"Something went wrong"})

     }
}
const updateNote=async(req,res)=>{
    const id=req.params.id
    const {title,description}=req.body
    const newNote={
        title:title,
        description:description,
        userid:req.userId
    }
    try{
        await noteModel.findByIdAndUpdate(id,newNote,{ new:true
        })
        res.status(200).json(newNote)

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }

}
const deleteNote=async(req,res)=>{
    const id=req.params.id
    try{
        const note=await noteModel.findByIdAndRemove(id)
        res.status(202).json(note)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})
    }
}
const getNote=async(req,res)=>{
       try{
           const notes= await noteModel.find({userid:req.userId})
           res.status(200).json(notes)
         
       }catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong"})

       }
} 

module.exports={
    createNote,updateNote,deleteNote,getNote
}
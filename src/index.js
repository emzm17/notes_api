const experss=require('express')
const app=experss()
const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
const mongoose=require('mongoose')
const dotenv=require('dotenv')


dotenv.config()

app.use(experss.json())

// app.use((req,res,next)=>{
//    console.log("http method",req.method+", url-"+req.url)
//    next()
// })

app.use('/users',userRouter)
app.use('/notes',noteRouter)

const PORT=process.env.PORT || 5000

app.get('/',(req,res)=>{
          res.send('Notes API from Dibya')
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  app.listen(PORT)
})
.catch((err)=>{
   console.log(err)
})






// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

// app.get('/quote',(req,res)=>{   
//      res.status(200).json(quotes)
// })

// // app.get('/random',(req,res)=>{
// //      let index=Math.floor(Math.random()*quotes.length)
// //      let quote=quotes[index]
// //      res.status(200).json(quote)
// // })



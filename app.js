const express= require('express');
const connectDB = require('./confiq/db');
const app = express();
const dotenv = require('dotenv').config()
const TacheRoutes= require('./Routes/Tache.routes')
const folderRoutes= require('./Routes/Folder.routes')
const UserRoutes= require('./Routes/User.routes')
const bobyParser= require('body-parser')
const cors= require('cors')
const{requireAuth}=require('./middlewares/ckeckAuth')
connectDB();

app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended: true}))
app.use(cors())

// app.use('/api/tache', TacheRoutes)
// app.use('/api/folder', folderRoutes)
app.use('/api/sticknote', UserRoutes,folderRoutes,TacheRoutes)
app.get('/jwtid',requireAuth,(req,res)=>{res.status(200).send(res.locals.user._id)})

app.listen(process.env.PORT, ()=> console.log('le serveur a demarrer au port :'+ process.env.PORT))

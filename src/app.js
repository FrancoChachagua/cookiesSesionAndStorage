import express from 'express';
// import {engine} from 'express-handlebars';
import cors from 'cors';
import upload from './services/upload.js';
import Contenedor from './classes/Contenedor.js';
import { getFiveFakeProducts, normalizeUtils, __dirname } from './utils.js';
import { Server } from 'socket.io';
import productos from './routes/products.js';
import Mongocontainer from './Contenedor/MongoContainer.js';
import { authors } from './daos/indexDao.js';
import { messages } from './daos/indexDao.js';

import session from "express-session";
import MongoStore from "connect-mongo";
import ios from 'socket.io-express-session';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en mi proyecto, products: ${PORT}`);
})
server.on('error', (error)=>console.log(`Error en el servidor ${error}`))

export const io = new Server(server);

const authenticationSession = (session({
    store:MongoStore.create({mongoUrl:"mongodb+srv://Franco:123@messageswithcookies.scahm.mongodb.net/sessions?retryWrites=true&w=majority"}),
    resave:false,
    saveUninitialized:false,
    secret:"CoderChat"
}))

app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log(`Peticion hecha a las ${time.toTimeString().split(" ")[0]}`);
    next();
});
app.use(authenticationSession);
io.use(ios(authenticationSession));

// Routes
app.use('/api/productos', productos);


app.get('/currentUser',(req,res)=>{
    let user = req.session.user
    console.log(user);
    res.send(user)
})
// app.get('/clr',(req,res)=>{
//     res.clearCookie('server').send('Clear Cookie')
// })

app.get('/logout', (req,res)=>{
    req.session.destroy(err=>{
        if(!err){
            res.send('Logout ok!')
        }else{
            res.send({status:'Logout ERR', body:err})
        }
    })
})



// POST 
app.post('/api/uploadfile',upload.array('images'),(req,res)=>{
    const files = req.files;
    if(!files || files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
})

app.post('/api/messages/create',async (req,res)=>{
    let messages = req.body;
    let result = await authors.save(messages);
    res.send({message:`Mensaje creado con exito!`, payload:result})
})

app.post('/api/messages/login', async (req,res)=>{
    let {email,contraseña} = req.body;
    if(!email||!contraseña) return res.status(400).send({error:"Incomplete fields"})
    const user = await authors.getById({email:email});//Obtengo al usuario ya de la DB
    if(!user) return res.status(404).send({error:"User not found"});
    if(user.objectData.contraseña!==contraseña) return res.status(400).send({error:"Incorrect Password"});
    //Hasta aquí, sabemos que va a haber usuario y que cumple su contraseña.
    req.session.user={
        nombre:user.objectData.nombre,
        email:user.objectData.email
    }
    res.send({status:"logged"})
})


// GET
app.get('/api/productos-test', (req,res)=>{
    let products = getFiveFakeProducts();
    res.send({products});
})


// socket
io.on('connection',socket=>{
    socket.broadcast.emit('thirdConnection','Alguien se ha unido al chat')
    socket.on('message',async data=>{
        const user = await authors.getByUsername(socket.handshake.session.user.nombre)
        let messagesSent ={
            author:user.payload._id,
            text:data.message
        }
        await messages.save(messagesSent);
        const messagesDb = await messages.getAllP();
        const objectNorm ={
            id:"email",
            messages:messagesDb
        }
        // console.log(messagesDb);
        const normalizedData = normalizeUtils(objectNorm);
        console.log(JSON.stringify(normalizedData,null,2));
        io.emit('messageLog',messagesDb);
    })
})

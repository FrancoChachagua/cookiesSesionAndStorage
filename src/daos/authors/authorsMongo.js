// import mongoose from 'mongoose';
// import  Schema from "mongoose";

// const collectionRef = 'authors';

// const AuthorSchema = new mongoose.Schema({
//     nombre:{
//         type:String,
//         required:true,
//     },
//     apellido:{
//         type:String,
//         required:true,
//     },
//     edad:{
//         type:Number,
//         required:true,
//     },
//     alias:{
//         type:String,
//         required:true,
//     },
//     avatar:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//     }
// }
// )

// export const authorService = mongoose.model(collectionRef,AuthorSchema)

import Schema from "mongoose";
import MongoContainer from "../../Contenedor/MongoContainer.js";

export default class AuthorsMongo extends MongoContainer{
    constructor(){
        super(
            'authors',
            {
            nombre:{
                type:String,
                required:true,
            },
            apellido:{
                type:String,
                required:true,
            },
            edad:{
                type:Number,
                required:true,
            },
            alias:{
                type:String,
                required:true,
            },
            avatar:{
                type:String,
                required:true,
            },
            email:{
                type:String,
                required:true,
            },
            contraseña:{
                type:String,
                required:true
            }
            }
        )
    }
}
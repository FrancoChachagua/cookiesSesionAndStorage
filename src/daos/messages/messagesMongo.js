// import mongoose from 'mongoose';
// import  Schema from "mongoose";

// const collectionRef = 'messages';

// const MessagesSchema = new mongoose.Schema({
//     _id:{
//         type:Schema.Types.ObjectId,
//     },
//     text:{
//         type:String,
//         required:true
//     },
//     author: {
//             type:Schema.Types.ObjectId,
//             ref:'authors',
//             required:true,
//     }
// })

// export const messagesService = mongoose.model(collectionRef,MessagesSchema)

import Schema from "mongoose";
import MongoContainer from "../../Contenedor/MongoContainer.js";

export default class MessagesMongo extends MongoContainer{
    constructor(){
        super(
            'messages',
            {
            text:{
                type:String,
                required:true
            },
            author: {
                    type:Schema.Types.ObjectId,
                    ref:'authors',
                    required:true,
            }
            }
        )
    }
}
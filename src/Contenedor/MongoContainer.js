import mongoose  from "mongoose";

mongoose.connect("mongodb+srv://Franco:123@messageswithcookies.scahm.mongodb.net/messageswithcookies?retryWrites=true&w=majority",
    {
    useNewUrlParser:true,
    useUnifiedTopology:true
    }
)

export default class MongoContainer{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps))
    }
    async getAllP(){
        try{
            let documents = await this.collection.find().populate('author')
            return {payload:documents}
            // return documents.map(result=>result)
        }catch(error){
            return {message:"error",error:`Ha sucedido un error y no es tu culpa! Error name:${error}`}
        }
    }
    async save(obj){
        try{
            let createObj = await this.collection.create(obj)
            return {message:"Ha sido creado con exito!",payload:createObj}
        }catch(error){
            return {message:"error",error:`Ha sucedido un error y no es tu culpa! Error name:${error}`}
        }
    }
    async insertOne(obj){
        try{
            let createObj = await this.collection.insert(obj)
            return {message:"Ha sido añadido con exito!",payload:createObj}
        }catch(error){
            return {message:"error",error:`Ha sucedido un error y no es tu culpa! Error name:${error}`}
        }
    }
    async getById(id){
        try{
            let objectData = await this.collection.findOne(id)
            // return {message:"Ha sido encontrado con exito!",payload:objectData}
            return {objectData}
        }catch(error){
            return {message:"error",error:`Ha sucedido un error y no es tu culpa! Error name:${error}`}
        }
    }
    async getByUsername(nombre){
        try{
            let objectData = await this.collection.findOne({nombre})
            return {message:"Ha sido encontrado con exito!",payload:objectData}
        }catch(error){
            return {message:"error",error:`Ha sucedido un error y no es tu culpa! Error name:${error}`}
        }
    }
}
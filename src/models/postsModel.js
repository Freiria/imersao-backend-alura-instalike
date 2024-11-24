import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function GetAllPosts(){
    const db = conexao.db("imersao-instabite");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function createPost(post){
    const db = conexao.db("imersao-instabite");
    const colecao = db.collection("posts");
    return colecao.insertOne(post);
}

export async function atualizarCreatePost(id, post){
    const db = conexao.db("imersao-instabite");
    const colecao = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objId)}, {$set:post});
}
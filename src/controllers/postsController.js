import { GetAllPosts, createPost } from "../models/postsModel.js";
import fs from "fs";

export async function listPosts(req, res){
    const result = await GetAllPosts();
    res.status(200).json( result);
}

export async function newPost(req, res){
    const post = req.body;
    try{
        const postcreated = await createPost(post);
        res.status(200).json(postcreated);
    }catch(error){
        console.error(error.message);
        res.status(500).json({"erro":"Falha na requisicao."})
    }
}

export async function uploadImg(req, res){
    const post = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try{
        const postcreated = await createPost(post);
        const imagemAtualizada = `uploads/${postcreated.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postcreated);
    }catch(error){
        console.error(error.message);
        res.status(500).json({"erro":"Falha na requisicao."})
    }
}
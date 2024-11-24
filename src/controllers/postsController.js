import { GetAllPosts, atualizarCreatePost, createPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"

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

export async function UpdateNewPost(req, res){
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;

    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        
        const post = {
            descricao: descricao,
            imgUrl: urlImg,
            alt: req.body.alt
        };

        const postcreated = await atualizarCreatePost(id, post);
        res.status(200).json(postcreated);
    }catch(error){
        console.error(error.message);
        res.status(500).json({"erro":"Falha na requisicao."})
    }


}
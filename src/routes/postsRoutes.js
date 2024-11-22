import express from "express";
import multer from "multer";
import { listPosts, newPost, uploadImg} from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
  const upload = multer({ storage: storage });

const routes =(app) => {
    app.use(express.json());

    app.get("/posts", listPosts);
    app.post("/posts",newPost);
    app.post("/posts/upload",upload.single("img"), uploadImg);
}

export default routes;
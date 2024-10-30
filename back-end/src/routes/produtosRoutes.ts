import express, { Request, Response } from 'express';
import pool from '../db'; // Conexão com o banco de dados
import { ProdutosController } from '../controllers/produtosController';
import asyncHandler from 'express-async-handler';

// Inicializar o controller de Produtos
const produtosController = new ProdutosController(pool);

const router = express.Router();

// Rota para listar todos os produtos
router.get('/listar', asyncHandler(async (req: Request, res: Response) => {
        await produtosController.listarProdutos(req, res);
    })
);

// Rota para buscar um produto pelo nome
router.get('/listar/:nome',asyncHandler(async (req: Request, res: Response) => {
        await produtosController.buscarProdutoPorNome(req, res);
    })
);

// Rota para adicionar um novo produto
router.post(
    '/criar',
    asyncHandler(async (req: Request, res: Response) => {
        await produtosController.adicionarProduto(req, res);
    })
);

export default router;

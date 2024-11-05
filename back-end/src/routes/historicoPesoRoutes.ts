import express, { Request, Response } from 'express';
import pool from '../db'; // Conexão com o banco de dados
import asyncHandler from 'express-async-handler';
import { HistoricoPesoController } from '../controllers/historicoPesoController';

// Inicializar o controller de historico de peso
const historicoPesoController = new HistoricoPesoController(pool);

const router = express.Router();

// Rota para listar historico de peso
router.get('/listar/:id', asyncHandler(async (req: Request, res: Response) => {
        await historicoPesoController.pegarHistoricoPeso(req, res);
    })
);


// Rota para adicionar um novo peso
router.post('/criar',asyncHandler(async (req: Request, res: Response) => {
        await historicoPesoController.salvarPeso(req, res);
    })
);

export default router;

import express, { Request, Response } from 'express';
import pool from '../db'; // Conexão com o banco de dados
import asyncHandler from 'express-async-handler';
import { HistoricoPesoController } from '../controllers/historicoPesoController';

// Inicializar o controller de historico de peso
const historicoPesoController = new HistoricoPesoController(pool);

const router = express.Router();

// Rota para listar historico de peso (últimos 7 dias para um usuário específico)
router.get('/listar/:id', asyncHandler(async (req: Request, res: Response) => {
    await historicoPesoController.pegarHistoricoPeso(req, res);
}));

// Rota para adicionar um novo peso à fila de processamento
router.post('/criar', asyncHandler(async (req: Request, res: Response) => {
    historicoPesoController.adicionarPesoAFila(req, res);
}));

// Rota para processar a fila de histórico de peso (salvando os registros em lote)
router.post('/processar-fila', asyncHandler(async (req: Request, res: Response) => {
    await historicoPesoController.processarFila();
    res.status(200).json({ message: "Fila processada com sucesso." });
}));

export default router;
